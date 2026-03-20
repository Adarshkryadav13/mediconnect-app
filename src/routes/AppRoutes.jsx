import { Route,Routes } from "react-router-dom";
import MainLayout from "../Layouts/mainLayouts";


import Register from "../pages/Register";
import Doctors from "../pages/Doctors";
import MyAppointments from "../pages/MyAppointments";
import BookAppointment from "../pages/BookAppointment";
import DoctorAppointments from "../pages/DoctorAppointments";

import ProtectedRoute from "./ ProtectedRoute";
import PatientRoute from "./PatientRoute";
import DoctorRoute from "./ DoctorRoute";
import Home from "../pages/Home";
import VideoCall from "../pages/VideoCall";
import SymptomChecker from "../pages/SymptomChecker";
import Labtest from "../pages/Labtest";
import Cart from "../pages/Cart";
function AppRoutes(){
    return(
        <Routes>

        {/* PUBLIC */}
        <Route
        path="/"
        element={
       <MainLayout>
        <Home />
      </MainLayout>
  }
/>
      
      <Route path="/register" element={ <MainLayout> <Register /> </MainLayout>} />

        {/* PATIENT */}
      <Route
        path="/doctors" element={
          <ProtectedRoute>
            <PatientRoute>
              <MainLayout><Doctors /></MainLayout>
            </PatientRoute>
          </ProtectedRoute>
        }
        />
      <Route path="/video/:roomId" element={<VideoCall />} />
      <Route
        path="/book/:doctorId"
        element={
          <ProtectedRoute>
            <PatientRoute>
              <MainLayout><BookAppointment /></MainLayout>
            </PatientRoute>
          </ProtectedRoute>
        }
      />
    <Route
        path="/my-appointments"
        element={
          <ProtectedRoute>
            <PatientRoute>
              <MainLayout><MyAppointments /></MainLayout>
            </PatientRoute>
          </ProtectedRoute>
        }
      />
       <Route path="/check" element={ <MainLayout> <SymptomChecker /></MainLayout> } />
       <Route path="/test" element={ <MainLayout> <Labtest/> </MainLayout> } />
       <Route path="/cart" element={ < MainLayout> <Cart /></MainLayout>} />
     {/* DOCTOR */}
     <Route
        path="/doctor-appointments"
        element={
          <ProtectedRoute>
            <DoctorRoute>
              <MainLayout><DoctorAppointments /></MainLayout>
            </DoctorRoute>
          </ProtectedRoute>
        }
      />
 </Routes>

   );
}
export default AppRoutes;