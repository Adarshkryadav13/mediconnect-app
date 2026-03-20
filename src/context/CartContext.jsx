import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { user, setOpenLogin } = useContext(AuthContext);

  // 🔥 Fetch cart from backend
  const fetchCart = async () => {
    
    try {
      
      const res = await axios.get("http://localhost:8000/api/cart/");

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