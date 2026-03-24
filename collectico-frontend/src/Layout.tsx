import Footer from "./newComponents/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./newComponents/NavBar";

function Layout() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center ">
      <ScrollToTop />
      <div className="w-full top-0 z-1500 ">
        <NavBar />
      </div>
      <div className="pt-28 w-full">
        <Outlet />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
