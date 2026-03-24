import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve("/home/z3tz3r0/Projects/collectico");
const frontendRoot = path.join(projectRoot, "collectico-frontend");
const backendRoot = path.join(projectRoot, "collectico-backend");

const launchFlowTargets = [
  {
    flow: "auth",
    files: [
      "src/pages/Register.jsx",
      "src/pages/Login.jsx",
      "src/contexts/AuthContext.jsx",
    ],
  },
  {
    flow: "browse",
    files: [
      "src/components/SearchBox.jsx",
      "src/components/SortBox.jsx",
      "src/components/YouMayAlsoLike.jsx",
      "src/pages/ProductPage.jsx",
    ],
  },
  {
    flow: "cart_checkout",
    files: [
      "src/contexts/CartContext.jsx",
      "src/pages/ProductPage.jsx",
      "src/pages/Cart.jsx",
      "src/components/Step.jsx",
      "src/pages/MyOrderPage.jsx",
    ],
  },
  {
    flow: "seller_submission",
    files: [
      "src/pages/PostPage.jsx",
      "src/pages/MarketPage.jsx",
    ],
  },
  {
    flow: "auction",
    files: [
      "src/components/AuctionSearch.jsx",
      "src/components/AuctionSort.jsx",
      "src/components/AuctionGallery.jsx",
      "src/pages/Auction.jsx",
    ],
  },
];

function normalizePath(rawPath) {
  return rawPath
    .replace(/\$\{baseURL\}/g, "")
    .replace(/\$\{[^}]+\}/g, ":param")
    .replace(/\?.*$/, "")
    .replace(/\/+/g, "/");
}

function formatRouteKey(method, routePath) {
  return `${method.toUpperCase()} ${routePath}`;
}

function routeMatches(registeredPath, referencedPath) {
  const registeredParts = registeredPath.split("/").filter(Boolean);
  const referencedParts = referencedPath.split("/").filter(Boolean);

  if (registeredParts.length !== referencedParts.length) {
    return false;
  }

  return registeredParts.every((part, index) => {
    return part.startsWith(":") || part === referencedParts[index];
  });
}

async function parseBackendRoutes() {
  const routeFile = await readFile(
    path.join(backendRoot, "src/routes/route.js"),
    "utf8",
  );

  const prefixes = [...routeFile.matchAll(/router\.use\("([^"]+)",\s*([a-zA-Z_$][\w$]*)\);/g)]
    .map((match) => ({
      prefix: match[1],
      middlewareName: match[2],
      middlewarePath: path.join(
        backendRoot,
        "src/middlewares",
        `${match[2]}.js`,
      ),
    }));

  const routes = [];

  for (const prefixEntry of prefixes) {
    const middlewareSource = await readFile(prefixEntry.middlewarePath, "utf8");
    const matches = middlewareSource.matchAll(
      /router\.(get|post|put|patch|delete)\("([^"]+)"/g,
    );

    for (const match of matches) {
      const method = match[1].toUpperCase();
      const childPath = match[2];
      const fullPath = normalizePath(`/api${prefixEntry.prefix}${childPath}`);

      routes.push({
        method,
        path: fullPath,
        key: formatRouteKey(method, fullPath),
      });
    }
  }

  return routes.sort((left, right) => left.key.localeCompare(right.key));
}

async function collectFrontendReferences() {
  const references = [];

  for (const target of launchFlowTargets) {
    for (const relativeFile of target.files) {
      const absoluteFile = path.join(frontendRoot, relativeFile);
      const source = await readFile(absoluteFile, "utf8");

      const apiMatches = source.matchAll(
        /(api|axios)\.(get|post|put|patch|delete)\(\s*(`([^`]+)`|"([^"]+)")/g,
      );
      for (const match of apiMatches) {
        const rawPath = match[4] ?? match[5];
        if (!rawPath || !rawPath.includes("/api")) {
          continue;
        }

        references.push({
          flow: target.flow,
          file: relativeFile,
          method: match[2].toUpperCase(),
          path: normalizePath(rawPath.slice(rawPath.indexOf("/api"))),
        });
      }

      const fetchMatches = source.matchAll(/fetch\(\s*(`([^`]+)`|"([^"]+)")/g);
      for (const match of fetchMatches) {
        const rawPath = match[2] ?? match[3];
        if (!rawPath || !rawPath.includes("/api")) {
          continue;
        }

        references.push({
          flow: target.flow,
          file: relativeFile,
          method: "GET",
          path: normalizePath(rawPath.slice(rawPath.indexOf("/api"))),
        });
      }
    }
  }

  return references.sort((left, right) => {
    return `${left.flow}:${left.file}:${left.method}:${left.path}`.localeCompare(
      `${right.flow}:${right.file}:${right.method}:${right.path}`,
    );
  });
}

function auditReferences(backendRoutes, frontendReferences) {
  const registeredByMethod = new Map();

  for (const route of backendRoutes) {
    const methodRoutes = registeredByMethod.get(route.method) ?? [];
    methodRoutes.push(route.path);
    registeredByMethod.set(route.method, methodRoutes);
  }

  const results = [];

  for (const reference of frontendReferences) {
    const methodRoutes = registeredByMethod.get(reference.method) ?? [];
    const match = methodRoutes.find((candidate) =>
      routeMatches(candidate, reference.path),
    );

    results.push({
      ...reference,
      matchedPath: match ?? null,
      ok: Boolean(match),
    });
  }

  return results;
}

function printSection(title) {
  console.log(`\n== ${title} ==`);
}

function printResults(backendRoutes, auditResults) {
  printSection("Registered Backend API Routes");
  for (const route of backendRoutes) {
    console.log(route.key);
  }

  printSection("Launch Flow API Contract Audit");
  for (const result of auditResults) {
    const status = result.ok ? "PASS" : "FAIL";
    const matchNote = result.ok ? ` -> ${result.matchedPath}` : "";
    console.log(
      `[${status}] ${result.flow} ${formatRouteKey(result.method, result.path)} (${result.file})${matchNote}`,
    );
  }

  const failed = auditResults.filter((result) => !result.ok);
  const groupedFailures = new Map();

  for (const item of failed) {
    const flowFailures = groupedFailures.get(item.flow) ?? [];
    flowFailures.push(item);
    groupedFailures.set(item.flow, flowFailures);
  }

  printSection("Summary");
  console.log(`Backend routes audited: ${backendRoutes.length}`);
  console.log(`Frontend launch references audited: ${auditResults.length}`);
  console.log(`Failures: ${failed.length}`);

  if (failed.length > 0) {
    for (const [flow, items] of groupedFailures) {
      console.log(`- ${flow}: ${items.length} failing API reference(s)`);
    }
  }
}

async function main() {
  const backendRoutes = await parseBackendRoutes();
  const frontendReferences = await collectFrontendReferences();
  const auditResults = auditReferences(backendRoutes, frontendReferences);

  printResults(backendRoutes, auditResults);

  const failures = auditResults.filter((result) => !result.ok);
  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

await main();
