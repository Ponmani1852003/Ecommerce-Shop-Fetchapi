import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 relative"
    >
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 text-xl"
        aria-label="Toggle wishlist"
      >
        {inWishlist ? "❤️" : "🤍"}
      </button>

      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-3"
      />

      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
        {product.title}
      </h3>

      <p className="text-xs text-gray-500 capitalize mb-2">{product.category}</p>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
        <span className="text-xs text-yellow-600">⭐ {product.rating.rate}</span>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </Link>
  );
}