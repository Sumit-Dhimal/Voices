import { useContext, createContext, useState, useEffect } from "react";
import axios from '../utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // modal
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authType, setAuthType] = useState("login"); // login || signup

    // <--------------- open modal helpers -------------------->
    const openLogin = () => {
        setAuthType("login");
        setIsAuthModalOpen(true);
    }

    const openSignup = () => {
        setAuthType("signup");
        setIsAuthModalOpen(true);
    }

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    }

    // <----------------------- Auth Logic --------------------->
    useEffect(() => {
        // fetches the currently logged in user
        async function fetchUser() {
            try {
                setLoading(true);
                const res = await axios.get('/users/me');
                setUser(res.data);
            } catch (err) {
                if (err.response?.status === 401) {
                  // User is not logged in
                  setUser(null);
                } else {
                  console.error("Unexpected error fetching user:", err);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [])

    const login = async(email, password) => {
        try {
            setLoading(true);
            const res = await axios.post(
                "/users/login", 
                {email, password},
            )
            //console.log(res.data);
            setUser(res.data);
            alert("Login successfull");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const signup = async(username, email, password) => {
        try {
            setLoading(true);
            const res = await axios.post(
                "/users/register",
                {username, email, password},
            )
            
            setUser(res.data);
            alert("Signup successfull");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const logout = async() => {
        try {
            setLoading(true);
            await axios.post(
                '/users/logout',
                "",
            ) 
    
            setUser(null);
            alert("Logout successfull");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // for mulitple providers use (provider) in parameter and use string ${provider} in path
    const loginWithOAuth = () => {
        // Redirect browser to backend OAuth route
        window.location.href = `http://localhost:3000/api/users/auth/google`;
    }

    return (
        <AuthContext.Provider
            value={{
                user, loading, 
                isAuthModalOpen, authType, openLogin, openSignup, closeAuthModal,
                login, signup, logout, 
                loginWithOAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

