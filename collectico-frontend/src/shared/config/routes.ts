export const storefrontRouteSegments = Object.freeze({
  animation: "animation",
  auction: "auction",
  auctionDetail: "auction/:auctionId",
  blog: "blog",
  detailBlog: "detailblog",
  financialReport: "financialreport",
  login: "login",
  luminary: "luminary",
  mainShop: "mainshop",
  market: "market",
  membership: "membership",
  mission: "mission",
  ourStory: "ourstory",
  productDetail: "product/:productId",
  register: "register",
  resetPassword: "resetpassword",
  shop: "shoppage",
  sponsorship: "sponsorship",
  teamMember: "teammember",
  cart: "cart",
  myOrder: "myorder",
  postPage: "postpage",
  editPost: "postpage/:editId",
});

export const adminRouteSegments = Object.freeze({
  root: "admin",
  dashboard: "dashboard",
  myArtworks: "myartworks",
  products: "products",
  upload: "upload",
});

export const routePaths = Object.freeze({
  home: "/",
  animation: `/${storefrontRouteSegments.animation}`,
  auction: `/${storefrontRouteSegments.auction}`,
  blog: `/${storefrontRouteSegments.blog}`,
  detailBlog: `/${storefrontRouteSegments.detailBlog}`,
  financialReport: `/${storefrontRouteSegments.financialReport}`,
  login: `/${storefrontRouteSegments.login}`,
  luminary: `/${storefrontRouteSegments.luminary}`,
  mainShop: `/${storefrontRouteSegments.mainShop}`,
  market: `/${storefrontRouteSegments.market}`,
  membership: `/${storefrontRouteSegments.membership}`,
  mission: `/${storefrontRouteSegments.mission}`,
  ourStory: `/${storefrontRouteSegments.ourStory}`,
  register: `/${storefrontRouteSegments.register}`,
  resetPassword: `/${storefrontRouteSegments.resetPassword}`,
  shop: `/${storefrontRouteSegments.shop}`,
  sponsorship: `/${storefrontRouteSegments.sponsorship}`,
  teamMember: `/${storefrontRouteSegments.teamMember}`,
  cart: `/${storefrontRouteSegments.cart}`,
  myOrder: `/${storefrontRouteSegments.myOrder}`,
  postPage: `/${storefrontRouteSegments.postPage}`,
  admin: `/${adminRouteSegments.root}`,
  adminDashboard: `/${adminRouteSegments.root}/${adminRouteSegments.dashboard}`,
  adminMyArtworks: `/${adminRouteSegments.root}/${adminRouteSegments.myArtworks}`,
  adminProducts: `/${adminRouteSegments.root}/${adminRouteSegments.products}`,
  adminUpload: `/${adminRouteSegments.root}/${adminRouteSegments.upload}`,
});

function buildParameterizedPath(
  pattern: string,
  paramName: string,
  value: string | number
) {
  return `/${pattern.replace(`:${paramName}`, String(value))}`;
}

export function getAuctionPath(auctionId: string | number) {
  return buildParameterizedPath(
    storefrontRouteSegments.auctionDetail,
    "auctionId",
    auctionId
  );
}

export function getProductPath(productId: string | number) {
  return buildParameterizedPath(
    storefrontRouteSegments.productDetail,
    "productId",
    productId
  );
}

export function getEditPostPath(editId: string | number) {
  return buildParameterizedPath(
    storefrontRouteSegments.editPost,
    "editId",
    editId
  );
}
