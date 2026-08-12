import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Profile() {
  const { username, logout } = useAuth();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            {username ? username.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{username || "Guest"}</h1>
            <p className="text-sm text-gray-500">Logged in via mock authentication</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 border rounded-md p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
            <p className="text-sm text-gray-500">Items in Cart</p>
          </div>
          <div className="bg-gray-50 border rounded-md p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{wishlist.length}</p>
            <p className="text-sm text-gray-500">Wishlist Items</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}