import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [auth,setAuth] = useState(null);
    
    useEffect(() => {
        const user = localStorage.getItem('auth')
        if (auth) setUser(auth)
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