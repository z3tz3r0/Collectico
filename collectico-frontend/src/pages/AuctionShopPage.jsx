import React from "react";
import AuctionSort from "../components/AuctionSort";
import BreadcrumbsNav from "../components/BreadcrumbsNav";

export default function AuctionShopPage() {
  const links = [
    { label: "Home", to: "/" },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#f2eee7]">
      <div className="w-full max-w-screen-2xl px-5 sm:px-12 mx-auto py-2">
        <BreadcrumbsNav links={links} currentPage="Auction" />
        <h1 className="text-3xl sm:text-4xl font-bold text-red-950 pt-10">
          Auction
        </h1>
        <div className="w-full h-[1px] bg-[#b5b3ad] my-3" />
        <p className="text-gray-800 text-lg sm:text-xl text-pretty">
          Discover an exclusive selection of rare artworks available for auction
          — from iconic masterpieces to hidden gems from around the world,
          including unique pieces created using a variety of painting
          techniques.
        </p>
        <div className="my-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <AuctionSort />
        </div>
      </div>
    </div>
  );
}
