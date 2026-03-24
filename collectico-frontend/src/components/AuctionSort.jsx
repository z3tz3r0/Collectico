import { useEffect, useState } from "react";
import api, { apiPaths } from "../../service/api";
import AuctionGallery from "../components/AuctionGallery";
import AuctionSearch from "./AuctionSearch";

// -------------------------------------------------------------

function AuctionSort() {
  const [sortState, setSortState] = useState("AZ");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [auctionData, setAuctionData] = useState([]);

  // CONNECT TO BACKEND
  async function getData() {
    try {
      const auctionData = await api.get(apiPaths.products.auctionList);
      setAuctionData(auctionData.data.allAuctionProduct || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  // Sort
  const sortMethods = {
    none: { method: () => 0 },
    AZ: { method: (a, b) => a.title.localeCompare(b.title) },
    ZA: { method: (a, b) => b.title.localeCompare(a.title) },
    // HL: { method: (a, b) => b.price - a.price },
    // LH: { method: (a, b) => a.price - b.price },
  };

  // FILTER BY KEYWORD (SEARCH)
  const searchedProducts = auctionData.filter((product) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      product.title.toLowerCase().includes(keyword) ||
      product.artist.toLowerCase().includes(keyword)
    );
  });

  // SORT
  const selectData = [...searchedProducts].sort(sortMethods[sortState].method);

  return (
    <div className="flex flex-col gap-[0px] sm:gap-[16px] w-full">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between">
        <AuctionSearch onSelectKeyword={(keyword) => setSearchKeyword(keyword)} />
        <select
          defaultValue={"AZ"}
          onChange={(e) => setSortState(e.target.value)}
          className="bg-[#EFD5C7] w-[200px] h-[43px] my-auto border-2"
        >
          {/* <option value="none" disabled>None</option> */}
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
          {/* <option value="HL">Price: high to low</option>
          <option value="LH">Price: low to high</option> */}
        </select>
      </div>
      <AuctionGallery products={selectData} />
    </div>
  );
}
export default AuctionSort;
