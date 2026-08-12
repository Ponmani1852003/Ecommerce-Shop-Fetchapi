import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useFetch(
    () => getProductById(productId),
    [productId]
  );

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Link to="/" className="text-blue-600 text-sm">&larr; Back to products</Link>

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="md:w-1/2 flex justify-center items-center bg-white border rounded-lg p-6">
          <img src={product.image} alt={product.title} className="h-72 object-contain" />
        </div>

        <div className="md:w-1/2 flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          <p className="text-yellow-600 text-sm">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>

          <div className="flex items-center gap-3 mt-2">
            <label htmlFor="quantity" className="text-sm">Quantity:</label>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg"
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() =>
                inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)
              }
              className="px-4 py-2 border rounded-md text-xl"
              aria-label="Toggle wishlist"
            >
              {inWishlist ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}