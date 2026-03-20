import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import LoginDrawer from "./LoginDrawer";
import { ShoppingCart, Search } from "lucide-react";
import logo1 from "../assets/logo1.png";

function Navbar() {
  const { user, loading, logout, openLogin, setOpenLogin } = useContext(AuthContext);
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState(""); // 🔥 search state

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const handleCartClick = () => {
    const token = localStorage.getItem("access");

    if (!token || token === "undefined" || token === "null") {
      alert("Please login first 🔐");
      setOpenLogin(true);
    } else {
      navigate("/cart");
    }
  };

  const handleSearch = () => {
    console.log("Searching:", query);
    // 👉 later connect API
  };

  if (loading) return null;

  return (
    <>
      <nav className="shadow-md shadow-emerald-400 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img src={logo1} alt="Medicoonect Logo" className="h-14 w-auto" />
          </Link>

          {/* 🔍 SEARCH BAR */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">

              <Search className="text-gray-500 mr-2" size={20} />

              <input
                type="text"
                placeholder="Search doctors, tests, symptoms..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
              />

              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-600 transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* NOT LOGGED IN */}
            {!user && !isAuthPage && (
              <>
                <button
                  onClick={() => setOpenLogin(true)}
                  className="h-10 w-24 border border-black rounded text-black"
                >
                  Login
                </button>

                <Link
                  to="/register"
                  className="h-10 w-24 border border-black rounded text-black px-4 py-2"
                >
                  Register
                </Link>
              </>
            )}

            {/* CART */}
            <button
              onClick={handleCartClick}
              className="relative flex items-center"
            >
              <ShoppingCart size={26} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* PATIENT */}
            {user && !user.is_doctor && (
              <>
                <Link to="/doctors" className="hover:underline">
                  Doctors
                </Link>

                <Link to="/my-appointments" className="hover:underline">
                  My Appointments
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate("/", { replace: true });
                  }}
                  className="bg-white text-blue-600 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            )}

            {/* DOCTOR */}
            {user && user.is_doctor && (
              <>
                <Link to="/doctor-appointments" className="hover:underline">
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate("/", { replace: true });
                  }}
                  className="bg-white text-blue-600 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* LOGIN DRAWER */}
      <LoginDrawer
        isOpen={openLogin}
        onClose={() => setOpenLogin(false)}
      />
    </>
  );
}

export default Navbar;
