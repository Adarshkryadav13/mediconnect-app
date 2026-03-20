import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function patientRoute({children}){
    const {user , loading} = useContext(AuthContext);

    if(loading ) return null;

    if(!user || user.is_doctor){
        return <Navigate to="/" replace />;

    }
    return children;
}
export default patientRoute;