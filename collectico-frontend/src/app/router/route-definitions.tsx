import type { ComponentType, ReactElement } from "react";
import ProtectedRoute from "@/pages/ProtectedRoute";
import {
  adminRouteSegments,
  storefrontRouteSegments,
} from "@/shared/config/routes";

type RouteModule = {
  default: ComponentType<any>;
};

function requireAuth(element: ReactElement) {
  return <ProtectedRoute>{element}</ProtectedRoute>;
}

function lazyComponent(importComponent: () => Promise<RouteModule>) {
  return async function resolveLazyComponent() {
    const module = await importComponent();

    return {
      Component: module.default,
    };
  };
}

function lazyProtectedComponent(importComponent: () => Promise<RouteModule>) {
  return async function resolveLazyProtectedComponent() {
    const module = await importComponent();
    const PageComponent = module.default;

    function ProtectedPageComponent() {
      return requireAuth(<PageComponent />);
    }

    return {
      Component: ProtectedPageComponent,
    };
  };
}

export const storefrontRoutes = [
  { index: true, lazy: lazyComponent(() => import("@/pages/LandingPage.jsx")) },
  {
    path: storefrontRouteSegments.animation,
    lazy: lazyComponent(() => import("@/Animation/Animation.jsx")),
  },
  {
    path: storefrontRouteSegments.auction,
    lazy: lazyComponent(() => import("@/pages/AuctionShopPage.jsx")),
  },
  {
    path: storefrontRouteSegments.auctionDetail,
    lazy: lazyComponent(() => import("@/pages/Auction.jsx")),
  },
  { path: storefrontRouteSegments.blog, lazy: lazyComponent(() => import("@/pages/BlogPage.jsx")) },
  {
    path: storefrontRouteSegments.detailBlog,
    lazy: lazyComponent(() => import("@/pages/DetailBlogPage.jsx")),
  },
  {
    path: storefrontRouteSegments.financialReport,
    lazy: lazyComponent(() => import("@/pages/FinancialReportingPage.jsx")),
  },
  { path: storefrontRouteSegments.login, lazy: lazyComponent(() => import("@/pages/Login.jsx")) },
  { path: storefrontRouteSegments.luminary, lazy: lazyComponent(() => import("@/pages/LuminaryPage.jsx")) },
  { path: storefrontRouteSegments.mainShop, lazy: lazyComponent(() => import("@/pages/MainShopPage.jsx")) },
  { path: storefrontRouteSegments.market, lazy: lazyComponent(() => import("@/pages/MarketPage.jsx")) },
  { path: storefrontRouteSegments.membership, lazy: lazyComponent(() => import("@/pages/MembershipPage.jsx")) },
  { path: storefrontRouteSegments.mission, lazy: lazyComponent(() => import("@/pages/MissionPage.jsx")) },
  { path: storefrontRouteSegments.ourStory, lazy: lazyComponent(() => import("@/pages/OurStoryPage.jsx")) },
  { path: storefrontRouteSegments.productDetail, lazy: lazyComponent(() => import("@/pages/ProductPage.jsx")) },
  { path: storefrontRouteSegments.register, lazy: lazyComponent(() => import("@/pages/Register.jsx")) },
  { path: storefrontRouteSegments.resetPassword, lazy: lazyComponent(() => import("@/pages/ForgotPassword.jsx")) },
  { path: storefrontRouteSegments.shop, lazy: lazyComponent(() => import("@/pages/ShopPage.jsx")) },
  {
    path: storefrontRouteSegments.sponsorship,
    lazy: lazyComponent(() => import("@/pages/CorporateSponsorshipPage.jsx")),
  },
  {
    path: storefrontRouteSegments.teamMember,
    lazy: lazyComponent(() => import("@/pages/MeetTeamMemberPage.jsx")),
  },
  {
    path: storefrontRouteSegments.cart,
    lazy: lazyProtectedComponent(() => import("@/pages/Cart.jsx")),
  },
  {
    path: storefrontRouteSegments.myOrder,
    lazy: lazyProtectedComponent(() => import("@/pages/MyOrderPage.jsx")),
  },
  {
    path: storefrontRouteSegments.postPage,
    lazy: lazyProtectedComponent(() => import("@/pages/PostPage.jsx")),
  },
  {
    path: storefrontRouteSegments.editPost,
    lazy: lazyProtectedComponent(() => import("@/pages/PostPage.jsx")),
  },
];

export const adminLayoutRoute = {
  path: `/${adminRouteSegments.root}`,
  lazy: lazyComponent(() => import("@/pages/Admin/AdminLayOut.jsx")),
  children: [
    { index: true, lazy: lazyComponent(() => import("@/pages/Admin/AdminMain.jsx")) },
    {
      path: adminRouteSegments.dashboard,
      lazy: lazyComponent(() => import("@/pages/Admin/DashboardPage.jsx")),
    },
    {
      path: adminRouteSegments.myArtworks,
      lazy: lazyComponent(() => import("@/pages/MyArtworksPage.jsx")),
    },
    {
      path: adminRouteSegments.products,
      lazy: lazyComponent(() => import("@/pages/Admin/AdminProducts.jsx")),
    },
    {
      path: adminRouteSegments.upload,
      lazy: lazyComponent(() => import("@/pages/Admin/AdminUpload.jsx")),
    },
  ],
};
