import { createContext, useCallback, useMemo, useState } from "react";
import { MY_AUTH_APP } from '../config/env';
import PropTypes from 'prop-types';

export const AuthContext = createContext(); // user


export default function AuthContextProvider({ children }){

    const [isAuthenticated, setIsAuthenticated] = useState(
        window.localStorage.getItem(MY_AUTH_APP) ?? false
        );
    

    
    const loginUser = useCallback(() => {
        window.localStorage.setItem(MY_AUTH_APP, true);
        setIsAuthenticated(true);

    }, []);

    const logoutUser = useCallback(() => {
        window.localStorage.removeItem(MY_AUTH_APP);
        setIsAuthenticated(false)
    }, []);

 


    const value = useMemo(() => ({
        loginUser,
        logoutUser,
        isAuthenticated,
    }), 
    [
        isAuthenticated,
        loginUser, 
        logoutUser
        
    ]);
    
    return(

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children:PropTypes.object,
}