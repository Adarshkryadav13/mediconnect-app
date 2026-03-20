import { useEffect, useState } from "react";

const slides = [
  {
    title: "Fast & Accurate Lab Tests At Home",
    desc: "Same day reports · Home sample collection in 30 mins",
    btn: "Book Now",
    img: "https://images.apollo247.in/pd-cms/cms/2025-06/Web%20Banner%20(1275x212)%202_0.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max",
  },
  {
    title: "Book Doctor Appointments Easily",
    desc: "Consult top doctors anytime, anywhere",
    btn: "Find Doctors",
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309",
  },
  {
    title: "Medicines Delivered to Your Doorstep",
    desc: "Fast delivery · Trusted pharmacy",
    btn: "Order Medicines",
    img: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  // 🔁 AUTO SLIDE
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[40vh] w-full overflow-hidden">

      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* IMAGE */}
          <img
            src={slide.img}
            alt="slide"
            className="w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* TEXT */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 text-white max-w-xl">
              <h1 className="text-3xl md:text-5xl font-bold">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg">{slide.desc}</p>

              <button className="mt-6 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold">
                {slide.btn}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
