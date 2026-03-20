import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    name: "Activated Charcoal Soap",
    price: 101.18,
    mrp: "₹177.5",
    discount: "43% off",
    img: "https://images.apollo247.in/pub/media/catalog/product/a/p/apa0097_1-sep2023.jpg"
  },
  {
    name: "Aqua Blue Hand Wash",
    price: 99.2,
    mrp: "₹160",
    discount: "38% off",
    img: "https://images.apollo247.in/pub/media/catalog/product/p/d/pdpimages_apollo_essentials_bluehandwash_2_1.png"
  },
  {
    name: "Refreshing Body Wash",
    price: 100,
    mrp: "₹200",
    discount: "50% off",
    img: "https://images.apollo247.in/pub/media/catalog/product/a/p/apo0159_front.jpg"
  },
  {
    name: "Refreshing Wet Wipes",
    price: 99.2,
    mrp: "₹160",
    discount: "38% off",
    img: "https://images.apollo247.in/pub/media/catalog/product/a/p/apr0111_1-qwerf.jpg"
  },
  {
    name: "Aloe Vera Skin Gel",
    price: 99.2,
    mrp: "₹160",
    discount: "38% off",
    img: "https://images.apollo247.in/pub/media/catalog/product/a/p/apa0089_1-sep2023.jpg"
  }
];

export default function ValueDeals() {

  // ✅ FIXED FUNCTION
  const addToCart = async (product) => {
    console.log("CLICKED:", product);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/cart/",
        {
          name: product.name,
          price: product.price, // number ✅
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ADDED:", res.data);
      alert("Added to cart ✅");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Value Deals at Rs 100</h2>
        <span className="text-green-700 cursor-pointer">View All</span>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={20}
        slidesPerView={5}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 }
        }}
      >
        {products.map((p, index) => (
          <SwiperSlide key={index}>

            <div className="border rounded-xl p-4 bg-white hover:shadow-lg transition">

              <img
                src={p.img}
                alt={p.name}
                className="h-40 mx-auto object-contain"
              />

              <h3 className="text-sm font-medium mt-3">
                {p.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold">₹{p.price}</span>
                <span className="line-through text-gray-400 text-sm">
                  {p.mrp}
                </span>
                <span className="text-green-600 text-sm">
                  {p.discount}
                </span>
              </div>

              <button
                onClick={() => addToCart(p)} // ✅ FIXED
                className="mt-4 w-full bg-green-800 text-white py-2 rounded-lg"
              >
                ADD
              </button>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}
