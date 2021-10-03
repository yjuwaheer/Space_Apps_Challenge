import React, { useState, useEffect, useRef } from "react";
import "../styles/Login.css";
// Auth
import { useAuth } from "../contexts/AuthContext";
// Routes
import { Link, useHistory } from "react-router-dom";
// Toast
import { toast } from "react-toastify";

const Login = () => {
    // Routes
    const history = useHistory();

    // Auth
    const { login } = useAuth();

    // Refs
    const emailRef = useRef();
    const passwordRef = useRef();

    // States
    const [loading, setLoading] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // UseEffect
    useEffect(() => {
        const unsubscribe = () => {
            setLoading(false);
        };

        return unsubscribe;
    }, [loading]);

    // Login a user
    const loginUser = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/home");
        } catch (error) {
            toast.error(error.message.split('Firebase: ')[1], {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <form className="login" onSubmit={(e) => loginUser(e)}>
                <div className="mainText">Login</div>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" ref={emailRef} required />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        ref={passwordRef}
                        required
                    />
                </div>
                <input type="submit" className="button" value="Login" />
                <div className="signupRedirect">
                    <div className="text">Don't have an account?</div>
                    <Link to="/signup" className="redirect">
                        Sign up
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
