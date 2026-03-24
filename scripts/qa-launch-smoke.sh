#!/usr/bin/env bash
set -u

ROOT_DIR="/home/z3tz3r0/Projects/collectico"
STATUS=0

run_check() {
  local label="$1"
  shift

  printf '\n== %s ==\n' "$label"
  if ! "$@"; then
    STATUS=1
  fi
}

run_check \
  "Frontend build" \
  bash -lc "cd '$ROOT_DIR/collectico-frontend' && npm run build"

run_check \
  "Frontend lint" \
  bash -lc "cd '$ROOT_DIR/collectico-frontend' && npm run lint"

run_check \
  "Backend test" \
  bash -lc "cd '$ROOT_DIR/collectico-backend' && npm test"

run_check \
  "Launch route contract audit" \
  node "$ROOT_DIR/scripts/qa-route-contract-audit.mjs"

exit "$STATUS"
