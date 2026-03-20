import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login({ onSuccess }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("auth/login/", form);

      console.log("LOGIN SUCCESS:", res.data);

      const user = await login(res.data);

      if (user.is_doctor) {
        navigate("/doctor-appointments");
      } else {
        navigate("/");
      }

      if (onSuccess) onSuccess();

    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data);
      alert("Invalid username or password ❌");
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold ml-40 mb-5">Login</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="mb-5 ml-28 border border-black rounded h-8 w-48 px-3"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <br />

        <input
          className="mb-5 ml-28 border border-black rounded h-8 w-48 px-3"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />

        <button
          className="ml-28 bg-blue-400 border rounded h-10 w-48 text-white"
          type="submit"
        >
          Login
        </button>
      </form>

      <div className="mt-3 ml-24">
        New Member?
        <button
          className="px-1 text-blue-400"
          onClick={() => navigate("/register")}
        >
          Register here
        </button>
      </div>
    </div>
  );
}

export default Login;
