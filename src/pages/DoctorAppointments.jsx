import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("appointments/doctor/")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.log(err.response?.data));
  }, []);

  return (
    <div>
      <h2>My Patient Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        appointments.map((appt) => (
          <div
            key={appt.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h3>Patient: {appt.patient_name}</h3>
            <p>Date: {appt.date}</p>
            <p>Time: {appt.time}</p>

            <button
  onClick={() => navigate(`/video/${appointments.room_id}`)}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Start Call
</button>

          </div>
        ))
      )}
    </div>
  );
}

export default DoctorAppointments;
