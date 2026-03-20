import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
    const navigate = useNavigate();

    const [doctors , setDoctors] = useState([]);
    const [form, setForm] = useState({
        doctor: "",
        date: "",
        time: "",
    });
    // Fetch doctor
    useEffect(()=>{
        api.get("doctors/")
        .then((res) =>setDoctors(res.data))
        .catch((err) => console.log(err));
    },[]);
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!form.doctor){
            alert("please select doctor")
            return;
        }
        try{
            await api.post("appointments/book/", form);
            alert("Appointment Booked successfully");
            navigate("/doctors");
        
        }
        catch(err){
            alert("failed to book appointment");
            console.log(err.response?.data);
        }
    };
    return(
        <div>
            <h2>Book Appointment</h2>
            <form onSubmit={handleSubmit}>
                {/* Doctor select */}
                <select name="doctor"
                 value={form.doctor} 
                 onChange={handleChange}
                 required 
                 
                >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc)=> (
                        <option key={doc.id} value={doc.id} >
                            Dr. {doc.doctor_name} ({doc.specialization})
                        </option>
                    ))}
                </select>
                {/* Date */}
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        {/* Time */}
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Appointment</button>

            </form>
        </div>
    );
}
export default BookAppointment;