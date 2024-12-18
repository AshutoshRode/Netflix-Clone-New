// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getAuth
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmRq2tQ3-dNIxKvWCKc10f7PNHF2XjmUo",
    authDomain: "netflix-clone-new-d0e2d.firebaseapp.com",
    projectId: "netflix-clone-new-d0e2d",
    storageBucket: "netflix-clone-new-d0e2d.appspot.com", // Corrected URL typo
    messagingSenderId: "136501215127",
    appId: "1:136501215127:web:e1245c5d38b43042428ed2",
    measurementId: "G-HD5XTH0RGZ",
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup Function
export const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Save user info to Firestore
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

        console.log("Signup successful:", user.email);
        toast.success("Signup successful!");
    } catch (error) {
        // console.error("Signup Error:", error.message);
        // toast.error(`Signup failed: ${error.message.split('/')[1].split('-').join(" ")}`);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

// Login Function
export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        // console.log("Login successful:", email);
        toast.success("Login successful!");
    } catch (error) {
        // console.error("Login Error:", error.message);
        // toast.error(`Login failed: ${error.message.split('/')[1].split('-').join(" ")}`);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

// Logout Function
export const logout = async () => {
    try {
        await signOut(auth);
        // console.log("Logout successful");
        toast.success("Logout successful!");
    } catch (error) {
        // console.error("Logout Error:", error.message);
        // toast.error(`Logout failed: ${error.message.split('/')[1].split('-').join(" ")}`);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

// Exporting Firebase Services
export { auth, db, analytics };
