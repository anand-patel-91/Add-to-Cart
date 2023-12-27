import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error.message);
            setLoading(false);
            setErr(true);
        }
    };

    return (
        <>
            <h1>Shopping Cart</h1>
            <div className="container">
                <h2>Sign Up</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) =>
                        setEmail(e.target.value.trimStart().toLowerCase())
                    }
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value.trimStart())}
                    value={password}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    required
                    onChange={(e) =>
                        setConfirmPassword(e.target.value.trimStart())
                    }
                    value={confirmPassword}
                />
                <button disabled={loading} onClick={handleSubmit}>
                    Create Account
                </button>
                {loading && "Creating Account, please wait..."}
                {err && <span className="error">Something went wrong</span>}
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </>
    );
};

export default Register;
