import {Navigate, useLocation} from "react-router-dom"
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
    const {auth} = UserAuth()
    let location = useLocation();

    if(!auth) {
        return <Navigate to="/login" state={{ from: location}} replace />
    } else {
        return children
    }
};

export default ProtectedRoute;