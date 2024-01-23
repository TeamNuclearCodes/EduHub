import {Navigate, useLocation} from "react-router-dom"
import getAuth from "../utils/getAuth";

const ProtectedRoute = ({children}) => {
    const user = getAuth
    let location = useLocation();

    if(!user) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    return children

};

export default ProtectedRoute;