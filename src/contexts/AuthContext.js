import React, { createContext, useContext, useEffect, useState } from "react";
// Firebase Config
import { auth } from "../FirebaseConfig";
// Firebase Auth Library
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // Function to sign up(create) a user
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Function to log in an existing user
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Function to log out a currently logged in user
    function logout() {
        return signOut(auth);
    }

    // Function to reset a user's password in case the latter forgets
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
