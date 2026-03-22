import Masonry from "@mui/lab/Masonry";
import { Link } from "react-router-dom";

// import products from "../../data/products";

const ProductCard = ({ product }) => {
  const priceValue = Number(product.price);
  return (
    <div className="relative group overflow-hidden shadow-md shadow-gray-700 hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#49352a]/90 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-6 text-[#f0e0d0]">
            <h3 className="text-xl font-semibold mb-2">
              {product.title}
            </h3>
            <p className="text-sm mb-1">
              By {product.artist}
            </p>
            <p className="text-base font-medium mb-4">
              ${priceValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProductGrid = ({ products }) => {
  return (
    <main>
      <section className="bg-[#e4dcd2] py-16 px-4">
        <div className="w-11/12 m mx-auto px-4">
          <div className="mx-auto max-w-screen-2xl flex justify-end pb-8 pr-2 md:pr-4 text-gray-700">
            Showing {products.length} Products
          </div>

          <Masonry columns={{ sm: 1, md: 3 }} spacing={7}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Masonry>
        </div>
      </section>
    </main>
  );
};

const MasonryGallery = ({ products }) => {
  return <ProductGrid products={products} />;
};

export default MasonryGallery;
