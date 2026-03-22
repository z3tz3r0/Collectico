import React from "react";
import SortBox from "../components/SortBox";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import { useLocation } from "react-router-dom";

export default function ShopPage() {
  // ใช้ useLocation เพื่อเข้าถึงค่า query params จาก URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genre = searchParams.get("genre");

  // กำหนดลิงก์สำหรับ breadcrumb
  const links = [
    { label: "Home", to: "/" },
    { label: "Collections", to: "/mainshop" },
  ];

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-[#f2eee7]">
        <div className="w-full max-w-screen-2xl px-6 sm:px-12 mx-auto py-2">
          <BreadcrumbsNav links={links} currentPage={genre} />
          <h1 className=" text-3xl sm:text-4xl font-bold text-red-950 pt-10">
            {genre ? `${genre} Paintings` : "The Collection"}
          </h1>
          <div className="w-full h-[1px] bg-[#b5b3ad] my-3" />
          <p className="text-gray-800 text-lg sm:text-xl text-pretty">
            Explore thousands of artworks in the museum's collection—from our
            renowned icons to lesser-known works from every corner of the globe
            as well as our books, writings, reference materials, and other
            resources.
          </p>
          <div className="my-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <SortBox />
          </div>
        </div>
      </div>
    </>
  );
}
