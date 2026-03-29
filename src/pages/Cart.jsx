import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import ValueDeals from "../components/Valuedeal";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { setCartCount } = useCart();
  // ✅ Fetch cart from Django
  const fetchCart = async () => {
    try {
      const res = await api.get("https://mediconnect-app-ej4q.onrender.com/api/");
      setCartItems(res.data.items);
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Remove item
  const removeFromCart = async (name) => {
    try {
     const res = await api.delete("https://mediconnect-app-ej4q.onrender.com/api/", {
        data: { name },
      });
      setCartCount(res.data.count); // update
      fetchCart(); // refresh UI
    } catch (err) {
      
      console.error(err);
    }
  };
  const updateQuantity = async (name, action) => {
    try {
        await api.put(
            "https://mediconnect-app-ej4q.onrender.com/api/",
            {
              name,
              action,
              
              
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
      fetchCart(); // refresh UI
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Calculate total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-4 mb-4 rounded"
            >
            <div>

  <h3 className="font-semibold">{item.name}</h3>

  <div className="flex items-center gap-3 mt-2">
    
    <button
      onClick={() => updateQuantity(item.name, "dec")}
      className="px-3 py-1 bg-gray-200 rounded"
    >
      -
    </button>

    <span>{item.quantity}</span>

    <button
      onClick={() => updateQuantity(item.name, "inc")}
      className="px-3 py-1 bg-gray-200 rounded"
    >
      +
    </button>

  </div>
</div>

              <div className="flex items-center gap-4">
                <p>₹{item.price * item.quantity}</p>

                <button
                  onClick={() => removeFromCart(item.name)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-6 ml-[660px]">
             Total: <span className="text-green-500">₹{totalPrice.toFixed(2)} </span> 
          </h3>
        </>
      )}
    </div>
  );
}
