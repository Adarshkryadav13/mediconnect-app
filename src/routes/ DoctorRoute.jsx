import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function DoctorRoute({children}){
    const { user, loading } = useContext(AuthContext);
    if (!user || !user.is_doctor) {
        return <Navigate to="/" replace />;
      }
    return children;
}
export default DoctorRoute;