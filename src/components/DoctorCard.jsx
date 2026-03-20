export default function DoctorCard({ doctor, navigate }) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 flex gap-6 border hover:shadow-lg transition">
  
        {/* Doctor Image */}
        <img
          src={`http://127.0.0.1:8000${doctor.photo}`}
          alt="doctor"
          className="w-28 h-28 rounded-xl object-cover"
        />
  
        {/* Doctor Info */}
        <div className="flex-1">
  
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">
                Dr. {doctor.doctor_name}
              </h2>
  
              <p className="text-gray-600">
                {doctor.specialization}
              </p>
  
              <p className="text-purple-600 font-semibold mt-2">
                6 YEARS • MBBS, MD
              </p>
  
              <p className="text-gray-500 mt-1">
                Bangalore
              </p>
            </div>
  
            <span className="bg-blue-800 text-white text-xs px-3 py-1 rounded-full">
              ON TIME GUARANTEE
            </span>
          </div>
  
          {/* Bottom Section */}
          <div className="flex justify-between items-center mt-6">
  
            <div className="text-2xl font-bold">
             ₹{doctor.consultation_fee}
            </div>
  
            <button
              onClick={() => navigate(`/book/${doctor.id}`)}
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50"
            >
              Online Consult
            </button>
  
          </div>
  
        </div>
      </div>
    );
  }
  