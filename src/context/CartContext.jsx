import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { user, setOpenLogin } = useContext(AuthContext);

  // 🔥 Fetch cart from backend
  const fetchCart = async () => {
    
    try {
      
      const res = await api.get("https://mediconnect-app-ej4q.onrender.com/api/");

      setCartItems(res.data.items);   // ✅ items
      setCartCount(res.data.count);   // ✅ count
      
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Run on page load (fix refresh issue)
  useEffect(() => {
    fetchCart();
  }, []);

  // ❌ REMOVE OLD addToCart logic (not needed now)
  // because backend handles it

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        setCartCount,
        setCartItems,
        fetchCart,   // 🔥 important
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};