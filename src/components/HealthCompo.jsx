import {
    HeartPulse,
    Activity,
    Stethoscope,
    Wind,
    ShieldPlus,
    Users,
    Pill,
    Droplet,
    VenusAndMars,
    Smile
  } from "lucide-react";
  
  const categories = [
    { name: "Diabetes Care", icon: Droplet },
    { name: "Cardiac Care", icon: HeartPulse },
    { name: "Stomach Care", icon: Activity },
    { name: "Pain Relief", icon: Pill },
    { name: "Liver Care", icon: Stethoscope },
    { name: "Oral Care", icon: Smile },   // replace Tooth
    { name: "Respiratory", icon: Wind },
    { name: "Sexual Health", icon: VenusAndMars },
    { name: "Elderly Care", icon: Users },
    { name: "Cold & Immunity", icon: ShieldPlus }
  ];
  
  
  export default function SymptomCategories() {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Select Health Category
        </h2>
  
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
  
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-md cursor-pointer transition"
              >
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Icon size={28} className="text-orange-500" />
                </div>
  
                <span className="font-medium">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
  
      </div>
    );
  }
  
