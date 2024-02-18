import {Navigate} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const auth = localStorage.getItem('auth')
    if(!auth) {
        return <Navigate to="/login"/>
    } else {
        return children
    }
};

export default ProtectedRoute;