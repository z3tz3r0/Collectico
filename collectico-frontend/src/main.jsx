import { createTheme, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Animation from "../Animation/Animation.jsx";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext";
import "./index.css";
import Layout from "./Layout.jsx";
import AdminLayOut from "./pages/Admin/AdminLayOut.jsx";
import AdminMain from "./pages/Admin/AdminMain.jsx";
import AdminProducts from "./pages/Admin/AdminProducts.jsx";
import AuctionPage from "./pages/Auction.jsx";
import AuctionShopPage from "./pages/AuctionShopPage.jsx";
import Cart from "./pages/Cart.jsx";
import CorporateSponsorshipPage from "./pages/CorporateSponsorshipPage.jsx";
import FinancialReportingPage from "./pages/FinancialReportingPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Luminarypage from "./pages/LuminaryPage.jsx";
import MainShopPage from "./pages/MainShopPage.jsx";
import MarketPage from "./pages/MarketPage.jsx";
import MeetTeamMemberPage from "./pages/MeetTeamMemberPage.jsx";
import MembershipPage from "./pages/MembershipPage.jsx";
import MissionPage from "./pages/MissionPage.jsx";
import MyOrderPage from "./pages/MyOrderPage.jsx";
import OurStoryPage from "./pages/OurStoryPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import DashboardPage from "./pages/Admin/DashboardPage.jsx";
import MyArtworksPage from "./pages/MyArtworksPage.jsx";


import './styles/fonts.css';
import BlogPage from "./pages/BlogPage.jsx";
import DetailBlogPage from "./pages/DetailBlogPage.jsx";
import AdminUpload from "./pages/Admin/AdminUpload.jsx";


const theme = createTheme({
  palette: {
    primary: {
      main: "#FFF",
      text: "#1B1B1B",
      grayText: "#4b5563",
      brown: "#6E5044",
      gray: "#373737",
      blue: "#1e4ae9",
      // color when hover
      charcoal: "#4D4D4D",
      darkCocoa: "#4B362D",
      softGray: "#EDEDED",


//------- Old color -----------//

      // main: "#62483a",
      // text: "#f2eee7",
      hoverText: "#49352a",
      bgButton: "#62483a3b",
      cream: "#f0e0d0",
      darkCream: "#e9e2d6",
      fontGray: "#757575",
      backgroundImgae: "#d9d9d9",
      buttonUpImage: "#667080",
      buttonUpImageHover: "#6670804c",
      inputBorder: "#9f8e84",
      formRegister: "#f9f7f3",
      mainSectionRegister: "#f2eee7",
      headerRegister: "#f8e4d4",
      lightBrown: "#c2a78f",
      chocolate: "#62483a",
      lightChocolate: "#62483acc",
    },
    secondary: {
      main: "#806248",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",

    body1: {
      fontFamily: "Poppins, sans-serif",
      color: "#1B1B1B",
      fontWeight: "300",
      fontSize: "0.625rem",
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
      color: '#1B1B1B',
      fontWeight: '500',
      fontSize: '0.875rem',
      '@media (min-width:600px)': {
        fontSize: '0.875rem',
      },
    },

    h1: {
      fontFamily: "Aremat, serif",
      color: "#1B1B1B",
      textTransform: "uppercase",
      fontSize: "1.25rem",
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontFamily: "Aremat, serif",
      color: "#1B1B1B",
      textTransform: "uppercase",
      fontSize: "1.25rem",
      "@media (min-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h3: {
      fontFamily: "Aremat, serif",
      color: "#1B1B1B",
      fontSize: "1rem",
      "@media (min-width:600px)": {
        fontSize: "1.25rem",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "9999px",
          height: "28px",
          fontWeight: 600,
          fontSize: "12px",
          "@media (min-width:600px)": {
            height: "42px",
            fontSize: "16px",
          },
        },
      },
    },
  },
});

// ------------- ROUTER ----------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/detailblog", element: <DetailBlogPage /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/market", element: <MarketPage /> },
      {
        path: "/postpage",
        element: (
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/postpage/:editId",
        element: (
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>
        ),
      },
      { path: "/mainshop", element: <MainShopPage /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myorder",
        element: (
          <ProtectedRoute>
            <MyOrderPage />
          </ProtectedRoute>
        ),
      },
      { path: "/shoppage", element: <ShopPage /> },
      { path: "/product/:productId", element: <ProductPage /> },
      { path: "/resetpassword", element: <ForgotPassword /> },
      { path: "/animation", element: <Animation /> },
      { path: "/auction", element: <AuctionShopPage /> },
      { path: "/auction/:auctionId", element: <AuctionPage /> },
      { path: "/membership", element: <MembershipPage /> },
      { path: "/luminary", element: <Luminarypage /> },
      { path: "/sponsorship", element: <CorporateSponsorshipPage /> },
      { path: "/mission", element: <MissionPage /> },
      { path: "/teammember", element: <MeetTeamMemberPage /> },
      { path: "/financialreport", element: <FinancialReportingPage /> },
      { path: "/ourstory", element: <OurStoryPage /> },
      // ADD PATH HERE
    ],
  },
  {
    path: "/admin",
    element: <AdminLayOut />,
    children: [
      { index: true, element: <AdminMain /> },

      { path: "/admin/products", element: <AdminProducts /> },
      { path: "/admin/dashboard", element: <DashboardPage /> },
      { path: "/admin/myartworks", element: <MyArtworksPage /> },
      { path: '/admin/upload', element: <AdminUpload /> },

    ],
  },

]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <CartProvider>
        <App>
          <RouterProvider router={router} />
        </App>
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
);
