import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("doctors/")
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    
<div className="">
    <img className ="pb-4 pt-4 " src="https://images.apollo247.in/images/consult-web/consult-home/contentful/doc-banner-desktop-new.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max" alt="image" />
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-4">

        {/* LEFT SIDE - DOCTOR LIST */}
        <div className="md:col-span-2 space-y-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} navigate={navigate} />
          ))}
        </div>

        {/* RIGHT SIDE HELP CARD */}
        <div className="hidden md:block">
          <div className="bg-blue-900 text-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-3">
              Need help consult the right doctor?
            </h2>
            <p className="text-sm mb-4">
              Call +91-7257894072 to book instantly
            </p>
            <button className="bg-white text-blue-900 px-4 py-2 rounded-full font-semibold">
              Call Now
            </button>
          </div>
        </div>

      </div>
    </div>
</div>
  );
}
