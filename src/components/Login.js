import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            setLoading(false);
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
                <h2>Sign In</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) =>
                        setEmail(e.target.value.trimStart().trimEnd())
                    }
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) =>
                        setPassword(e.target.value.trimStart().trimEnd())
                    }
                    value={password}
                />
                <button disabled={loading} onClick={handleSubmit}>
                    Log In
                </button>
                {loading && "Logging in, please wait..."}
                {err && <span className="error">Something went wrong</span>}
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </>
    );
};

export default Login;
