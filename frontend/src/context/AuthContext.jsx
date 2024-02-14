import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [auth,setAuth] = useState("");
    
    useEffect(() => {
        try {
            const user = localStorage.getItem('auth')
            if (user) setAuth(user)
            console.log(auth);
        } catch (error) {
            console.log(error)
        }
    },[])

    return (
        <AuthContext.Provider value={{auth ,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}