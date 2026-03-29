import api from "../api/axios";
import { useCart } from "../context/CartContext";
import axios from "axios";

const tests = [
  {
    name: "CBC Test (Complete Blood Count)",
    testsIncluded: "30 Tests Included",
    price: 419,
    original: 1047,
    discount: "60% off",
  },
  {
    name: "HbA1c Test (Hemoglobin A1c)",
    testsIncluded: "3 Tests Included",
    price: 649,
    original: 1623,
    discount: "60% off",
  },
  {
    name: "FBS (Fasting Blood Sugar) Test",
    testsIncluded: "1 Test Included",
    price: 100,
    original: 250,
    discount: "60% off",
  },
  {
    name: "Lipid Profile Test",
    testsIncluded: "8 Tests Included",
    price: 829,
    original: 2072,
    discount: "60% off",
  },
  {
    name: "LFT (Liver Function) Test",
    testsIncluded: "11 Tests Included",
    price: 829,
    original: 2072,
    discount: "60% off",
    tag: "Recommended for LFT",
  },
  {
    name: "PPBS Test (Post-Prandial Blood Sugar)",
    testsIncluded: "1 Test Included",
    price: 100,
    original: 250,
    discount: "60% off",
  },
];

export default function TopTests() {
    const { setCartCount } = useCart();
    const { fetchCart } = useCart();

  const addToCart = async (test) => {
    //console.log("CLICKED:", test);
    

    try {
      const res = await api.post(
        "https://mediconnect-app-ej4q.onrender.com/api/",
        {
          name: test.name,
          price: test.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCartCount(res.data.count);
      fetchCart(); 
      console.log("ADDED SUCCESS:", res.data);
      alert("Item added to cart ✅");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert("Error adding item ");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Top Booked Tests (43)
        </h2>

        <button className="border px-4 py-2 rounded-lg">
          Sort By ⬍
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {tests.map((test, index) => (
          <div
            key={index}
            className="border rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition"
          >

            <div className="flex gap-4">
              <div className="bg-gray-100 p-4 rounded-xl">
                🧪
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {test.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {test.testsIncluded}
                </p>

                {test.tag && (
                  <p className="text-orange-500 text-sm mt-1">
                    {test.tag}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div>
                <span className="text-xl font-bold">
                  ₹{test.price}
                </span>

                <span className="line-through text-gray-400 ml-2 text-sm">
                  ₹{test.original}
                </span>

                <p className="text-green-600 text-sm">
                  {test.discount}
                </p>
              </div>

              <button
                onClick={() => addToCart(test)}
                className="bg-teal-700 text-white px-6 py-2 rounded-lg"
              >
                Add
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
