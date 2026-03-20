import HeroSlider from "../components/HeroSlider";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HealthCompo from "../components/HealthCompo";
import Valuedeal from "../components/Valuedeal";

function Home() {
  const navigate = useNavigate();
  const { user, setOpenLogin } = useContext(AuthContext);

  const handleDoctorClick = () => {
    if (!user) {
      setOpenLogin(true);
    } else {
      navigate("/doctors");
    }
  };
 const handlesymptom = () => {
  if (!user){
    setOpenLogin(true);
  }else{
    navigate("/check")
  }
 };
  const handleLabtest= () => {
  if (!user){
    setOpenLogin(true);
  }else{
    navigate("/test")
  }
 };
  return (
    <div className="space-y-10">

      <HeroSlider />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          title="Doctor Appointment"
          subtitle="Book Now"
          color="bg-yellow-100"
          onClick={handleDoctorClick}
        />

        <ActionCard
          title="Lab Tests"
          subtitle="At Home"
          color="bg-pink-100"
          onClick={handleLabtest}
        />

        <ActionCard
          title="Symptom Check"
          subtitle="By expert doctor"
          color="bg-green-100"
          onClick={handlesymptom}
        />
      </section>

    <HealthCompo />
    <div>
      <img src="https://images.apollo247.in/images/category/nps_desktop_banner.png?tr=q-85,f-webp,w-1250,dpr-1,c-at_max" alt="" />
    </div>
    <Valuedeal/>
    </div>
    

  );
}

function ActionCard({ title, subtitle, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${color} rounded-xl p-6 flex justify-between items-center cursor-pointer hover:shadow-lg transition`}
    >
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <span className="text-2xl font-bold">→</span>
    </div>
  );
}



export default Home;
