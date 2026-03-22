import { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { Box } from "@mui/material";
import baseURL from "../../service/api";
import axios from "axios";

const ProductGrid = ({ products }) => {
  const [bids, setBids] = useState({}); // { [productId]: currentBid }

  useEffect(() => {
    const fetchBids = async () => {
      const bidsObj = {};
      await Promise.all(
        products.map(async (product) => {
          try {
            const res = await axios.get(`${baseURL}/api/bids/${product._id}`);
            const data = res.data;
            const highest =
              data.length > 0 ? Math.max(...data.map((b) => b.amount)) : 0;
            bidsObj[product._id] = highest;
          } catch {
            bidsObj[product._id] = 0;
          }
        })
      );
      setBids(bidsObj);
    };
    if (products.length > 0) fetchBids();
  }, [products]);

  //Remaining time for each auction card
  const updateTimeLeft = (index) => {
    const now = new Date();
    const end = new Date(products[index].auction.endDate || 0);
    const diff = end - now;
    if (diff < 0) return 0;
    return diff;
  };
  

  return (
    <section className="relative bg-transparent sm:bg-[#e4dcd2] py-16 px-0 sm:px-4">
        <div className="w-11/12 m mx-auto sm:px-4">
          <div className="mx-auto max-w-screen-2xl flex justify-end pb-8 pr-2 md:pr-4 text-gray-700">
            Showing {products.length} Products
          </div>

          <Box
            sx={{
              display: "flex",
              flexWrap: 'wrap',
              gap:7,
              alignContent: "center",
              paddingLeft: { xs: 0, sm: 0 },
            }}
          >
            {products.map((product, index) => (
              <AuctionCard
                key={product._id}
                productId={product._id}
                image={product.image}
                title={product.title}
                artist={product.artist}
                linkUrl={`/auction/${product._id}`}
                price={bids[product._id] ?? "Loading..."}
                timeLeft={updateTimeLeft(index)}
                width={350}
                height={510}
              />
      ))}
          </Box>
        </div>
      </section>
  );
};

export default ProductGrid;
