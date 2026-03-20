import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("appointments/my/")
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("MY APPOINTMENTS ERROR:", err.response?.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading appointments...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">
          You have not booked any appointments yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white shadow-md rounded-lg p-5 border"
            >
              <h2 className="text-lg font-semibold">
                Dr. {appt.doctor_name}
              </h2>

              <p className="text-gray-600">
                {appt.specialization}
              </p>

              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Date:</span> {appt.date}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {appt.time}
                </p>
              </div>
              <button
              onClick={() => navigate("/video/room123")}
              className="bg-green-600 text-white px-4 py-2 rounded"
              >
              connect to doctor 
             </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
