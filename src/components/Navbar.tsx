import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  function linkClass(path: string) {
    return location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          ShopEasy
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={linkClass("/")}>Home</Link>

          <Link to="/wishlist" className={`flex items-center gap-1.5 ${linkClass("/wishlist")}`}>
          <span>Wishlist</span>
            <span className="relative text-xl">
              💚
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </span>
            
          </Link>

          <Link to="/cart" className={`flex items-center gap-1.5 ${linkClass("/cart")}`}>
          <span>Cart</span>
            <span className="relative text-xl">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </span>
            
          </Link>

          {isAuthenticated ? (
            <button onClick={logout} className="text-gray-700 hover:text-blue-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className={linkClass("/login")}>Login</Link>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4">
          <Link to="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>Home</Link>

          <Link to="/wishlist" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span>Wishlist</span>
            <span className="relative text-xl">
              💚
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </span>
            
          </Link>

          <Link to="/cart" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
           <span>Cart</span>
            <span className="relative text-xl">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </span>
           
          </Link>

          {isAuthenticated ? (
            <button onClick={() => { logout(); setMenuOpen(false); }} className="text-left">
              Logout
            </button>
          ) : (
            <Link to="/login" className={linkClass("/login")} onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}