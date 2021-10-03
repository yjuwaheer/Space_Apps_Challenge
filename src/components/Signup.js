import React, { useState, useEffect, useRef } from "react";
import "../styles/Signup.css";
// Firebase Config
import { db } from "../FirebaseConfig";
// Firebase Firestore Library
import { collection, addDoc } from "firebase/firestore";
// Auth
import { useAuth } from "../contexts/AuthContext";
// Routes
import { Link, useHistory } from "react-router-dom";
// Toast
import { toast } from "react-toastify";

const Signup = () => {
    // Routes
    const history = useHistory();

    // Auth
    const { signup } = useAuth();

    // Refs
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

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

    const createUser = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return toast.error("Passwords do not match.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        try {
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);

            // Create user profile upon successful signup
            createUserProfile(
                emailRef.current.value,
                usernameRef.current.value
            );

            history.push("/home");
        } catch (error) {
            toast.error(error.message, {
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

    // Function to create user profile in firestore
    const createUserProfile = async (email, username) => {
        console.log("Creating user profile.");
        const docRef = await addDoc(collection(db, "users"), {
            email: email,
            username: username,
        });
    };

    return (
        <div className="container">
            <form className="signup" onSubmit={(e) => createUser(e)}>
                <div className="mainText">Sign Up</div>
                <div className="username">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        ref={usernameRef}
                        required
                    />
                </div>
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
                <div className="confirmPassword">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        ref={confirmPasswordRef}
                        required
                    />
                </div>
                <input type="submit" className="button" value="Sign Up" />
                <div className="loginRedirect">
                    <div className="text">Already have an account?</div>
                    <Link to="/login" className="redirect">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
