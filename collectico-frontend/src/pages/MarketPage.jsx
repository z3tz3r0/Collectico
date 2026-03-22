import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../service/api";
import ButtonSubmit from "../components/ButtonSubmit";
import { Button } from "@mui/material";
import PostCard from "../components/PostCard";
import ButtonToggle from "../components/ButtonToggle";
import BreadcrumbsNav from "../components/BreadcrumbsNav";

export default function MarketPage() {
  // STATE FOR KEEPING ALL PRODUCTS
  const [allProducts, setAllProducts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");

  const showPending = () => setStatusFilter("pending");
  const showOnGoing = () => setStatusFilter("ongoing");
  const showCompleted = () => setStatusFilter("completed");

  // STATE FOR SHOW NO POST
  // const [noPost, setNoPost] = useState(true);

  const links = [{ label: "Home", to: "/" }];

  const filteredProducts = allProducts.filter((product) => {
    const status = product.status?.toLowerCase();
    const approve = product.approve?.toLowerCase();
    const filter = statusFilter.toLowerCase();

    if (filter === "pending" ) return approve === "pending";
    if (filter === "ongoing") return status === "ongoing" && approve === "approved";
    if (filter === "completed") return status === "completed"  && approve === "approved";
    return false;
  });


  // WHEN REFRESH -> GET DATA OF ALL PRODUCTS FROM DATABASE
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/api/my-products`);
        setAllProducts(res.data);
        // setNoPost(res.data.length === 0);
      } catch (err) {
        console.error("Error fetching products:", err);
        setAllProducts([]);
        // setNoPost(true);
      }
    };
    fetchProducts();
  }, []);

  // DELETE BUTTON FUNCTION
  async function handleDelete(id) {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if  (!confirmed) return;

      await api.delete(`/api/product-delete/${id}`);

      //update local
      const updatedProducts = allProducts.filter(
        (product) => product._id !== id
      );
      setAllProducts(updatedProducts);

      alert("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  }

  const navigate = useNavigate();

  // EDIT BUTTON FUNCTION
  function handleEdit(id) {
    navigate(`/postpage/${id}`);
  }

  return (
    <div className="w-full min-h-[100vh] bg-[#F2EEE7] text-[#62483A] sm:px-2 py-2 ">
      {/* -------------------CONTENT----------------- */}
      <BreadcrumbsNav links={links} currentPage="Market" />
      <div className="flex flex-col items-center gap-4 w-full py-[50px]">
        <header className="flex flex-col gap-4 w-[90%] sm:w-[80%] bg-[#f0e0d000]">
          <div className="flex flex-row justify-between">
            <h1 className="text-[1.8rem] sm:text-[2rem] font-bold">Market</h1>
            <Link to="/postpage">
              <ButtonSubmit label="+ Post New Product" px={{xs:"3px",sm:"20px"}} py="8px" />
            </Link>
          </div>
          {/* Button Toggle */}
          <div className="buttonToggle text-center sm:text-start">
            <ButtonToggle
              label1="pending"
              label2="ongoing"
              label3="completed"
              showPending={showPending}
              showOnGoing={showOnGoing}
              showCompleted={showCompleted}
            />
          </div>
        </header>

        {/* -------------------PRODUCT LIST----------------- */}
        <section className="flex flex-col items-center w-[90%] sm:w-[80%] min-h-[100vh] bg-red-0">
          {/* BEFORE POST PRODUCT */}
          {filteredProducts.length === 0 && (
            <div className="flex items-center justify-center w-full h-[500px] bg-[#f0e0d0] rounded-lg">
              <div className="relative flex flex-col items-center w-[80%] h-[80%] bg-white rounded">
                <img
                  src="./decoration/no-image.png"
                  alt="no product"
                  className=" w-[300px]"
                />
                <p className="absolute top-65 font-semibold">
                  You haven't posted product.
                </p>
              </div>
            </div>
          )}

          {/* AFTER POST PRODUCT */}
          {filteredProducts.length > 0 && (
            <div className="relative flex flex-row gap-8 flex-wrap justify-center w-full px-4 sm:px-8 py-12 bg-[#f0e0d0] rounded-2xl">
              {filteredProducts.map((product) => {
                return (
                  <PostCard
                    key={product._id}
                    onDelete={() => handleDelete(product._id)}
                    onEdit={() => handleEdit(product._id)}
                    image={product.image}
                    title={product.title}
                    artist={product.artist}
                    price={product.price}
                    auction={product.auction}
                    minBidPrice={product.minBidPrice}
                    endDate={product.endDate}
                    tags={product.tags}
                    product={product}
                    status={product.status}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
