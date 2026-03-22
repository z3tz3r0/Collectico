import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import products from "../../data/products";

function ListBox({ keyword }) {
  //Filter product that Title or Artist includes Keyword

  const matchedTitle = products.filter((product) => {
    return product.title.toLowerCase().includes(keyword.toLowerCase());
  });

  const matchedArtist = products.filter((product) => {
    return product.artist.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <div className="absolute top-12 bg-gray-400 w-full rounded-lg">
      {matchedTitle.length === 0 && matchedArtist.length === 0 && (
        <div className="px-2 py-1 hover:bg-gray-500">Not Found...</div>
      )}

      {matchedTitle.map((product) => {
        return (
          <div className="px-2 py-1 hover:bg-gray-500 rounded">{product.title}</div>
        );
      })}

      {matchedArtist.map((product) => {
        return (
          <div className="px-2 py-1 hover:bg-gray-500 rounded">{product.artist}</div>
        );
      })}
    </div>
  );
}

export default function SearchNav() {
  const [showInput, setShowInput] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="relative w-80 bg-gray-400">
      <div
        className={`absolute right-0 ${
          showInput ? "w-80" : "w-10"
        } h-10  rounded-full overflow-hidden transition-all duration-300 bg-amber-300 bg-primary-chocolate`}
      >
        {showInput && (
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            placeholder="Search by keyword or artist"
            className="w-full h-full p-4 outline-0 bg-red-400"
          />
        )}
        <SearchIcon
          onClick={() => setShowInput(!showInput)}
          sx={{
            position: "absolute",
            right: 7,
            width: 25,
            height: "100%",
            cursor: "pointer",
          }}
        />
      </div>
      {searchText && <ListBox keyword={searchText} />}
    </div>
  );
}
