import { createContext, useContext, useState, useEffect } from "react";
import { Login } from "./MemberAccountsMethods";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [loginResult, setLoginResult] = useState();
    const [loginMessage, setLoginMessage] = useState();

    const memberLogin = (username, password) => {
        
        Login(username, password)
            .then(async result => {return await result.json()})
            .then(async result => {
                if (await result.status === 200) {
                    const loginData = {
                        "__": result.body.member_id,
                        "first_name": result.body.first_name,
                        "middle_name": result.body.middle_name,
                        "last_name": result.body.last_name
                    };
                    
                    window.sessionStorage.setItem('___', JSON.stringify(loginData));
                    setLoginResult(JSON.parse(window.sessionStorage.getItem("___")));
                } else {
                    setLoginMessage(result.message);
                }
            });
    }

    const memberLogout = () => {
        window.sessionStorage.clear();
        setLoginResult('');
        setLoginMessage('');
    }

    useEffect(() => {
        setLoginResult(JSON.parse(window.sessionStorage.getItem("___")));
    }, [])

    return <AuthContext.Provider value={{ memberLogin, memberLogout, loginResult, loginMessage }}>
        { children }
    </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext);
}