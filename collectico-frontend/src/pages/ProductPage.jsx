import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { apiPaths } from "../../service/api";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import ButtonSubmit from "../components/ButtonSubmit";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

function getCartProductId(item) {
  return item?.productId?._id ?? item?.productId;
}

function ProductPage() {
  const { user, openLoginPopup } = useAuth();
  const [product, setProduct] = useState(null);
  const [isInCartDB, setIsInCartDB] = useState(false);
  const [loading, setLoading] = useState(true);

  const { cartItems, setCartItems, refreshCart } = useCart();
  const links = [
    { label: "Home", to: "/" },
    { label: "Collections", to: "/mainshop" },
  ];
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(apiPaths.products.detail(productId));
        setProduct(res.data?.product ?? null);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }

    refreshCart();
  }, [refreshCart, setCartItems, user]);

  //Check if this product is already in cart
  useEffect(() => {
    if (product) {
      setIsInCartDB(
        cartItems?.some((item) => getCartProductId(item) === product._id)
      );
    }
  }, [cartItems, product]);

  //Add product to cart in Database
  const addProductToDB = async (product) => {
    try {
      const newProduct = {
        items:
        {
          productId: product._id?.toString(),
          title: product.title,
          image: product.image,
          artist: product.artist,
          price: product.price,
          quantity: 1,
        },
      };

      await api.post(apiPaths.cart.add, newProduct);
      await refreshCart();
      setIsInCartDB(true);
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err.message);
    }
  };

  //Remove Product from Database
  const removeProductFromDB = async (product) => {
    try {
      await api.delete(apiPaths.cart.remove(product._id));
      setCartItems((prev) =>
        prev.filter((item) => getCartProductId(item) !== product._id)
      );
      setIsInCartDB(false);
    } catch  (err) {
      console.error("Add to cart failed:", err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );
  }

  const priceValue = Number(product.price);

  // console.log("Product:", product.image);
  return (
    <main className="bg-[#f2eee7]">
      <div className="px-4 py-6 max-w-7xl mx-auto xl:px-12 2xl:px-20">
        <BreadcrumbsNav links={links} currentPage={product.title} />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product image */}
          <div className="md:w-1/2 xl:max-w-[600px]">
            <div className="shadow-md shadow-gray-700 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-semibold text-[#5c3c2e] mb-1">
              {product.title}
            </h1>
            <p className="mb-6">By {product.artist}</p>
            <p className="text-2xl font-semibold mb-8">
              ${priceValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>

            <div className="mb-8">
              <h2 className="text-lg font-medium mb-3">Description</h2>
              <p className="leading-relaxed text-justify">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-medium mb-3">Edition Details</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Dimensions:</span>{" "}
                  {product.dimensions}
                </p>
                <p>
                  <span className="font-semibold">Artist:</span>{" "}
                  {product.artist}
                </p>
                <p>
                  <span className="font-semibold">Material:</span>{" "}
                  {product.material}
                </p>
                <p>
                  <span className="font-semibold">Year:</span>{" "}
                  {product.yearCreated}
                </p>
              </div>
            </div>

            <ButtonSubmit
              width="100%"
              label={isInCartDB ? "Remove from Cart" : "Add to Cart"}
              onClick={() => {
                if (!user) {
                  openLoginPopup();
                  return;
                }

                if (isInCartDB) {
                  removeProductFromDB(product);
                } else {
                  addProductToDB(product);
                }
              }}
            />

            {product.tags && (
              <div className="mt-6">
                <h2 className="text-lg font-medium mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#d4c8b6] px-3 py-1 rounded-md text-sm"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <YouMayAlsoLike currentProduct={product} />
    </main>
  );
}

export default ProductPage;
