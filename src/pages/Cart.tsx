import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link to="/" className="text-blue-600 font-medium">Continue Shopping &rarr;</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({totalItems} items)</h1>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg p-4 bg-white"
          >
            <img
              src={item.product.image}
              alt={item.product.title}
              className="h-20 w-20 object-contain"
            />

            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-medium text-sm">{item.product.title}</h3>
              <p className="text-gray-500 text-sm">${item.product.price.toFixed(2)} each</p>
            </div>

            <div className="flex items-center border rounded-md">
              <button
                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                className="px-3 py-1"
              >
                −
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="px-3 py-1"
              >
                +
              </button>
            </div>

            <p className="font-semibold w-20 text-center">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item.product.id)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <div className="w-full sm:w-72 bg-gray-50 border rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}