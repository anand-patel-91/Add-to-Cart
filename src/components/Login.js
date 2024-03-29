import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [visibility, setVisibility] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);

        if (!email) {
            alert("Email cannot be empty");
            setLoading(false);
            return;
        }
        if (!password) {
            alert("Password cannot be empty");
            setLoading(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);

            if (!auth.currentUser.emailVerified) {
                await signOut(auth);
                navigate("/login");
                alert(
                    "Click on the link received at your email to verify your email and then try again!"
                );
            } else {
                navigate("/");
            }
            setLoading(false);
        } catch (error) {
            alert(error.message);
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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <input
                        type={visibility ? "text" : "password"}
                        placeholder="Enter your password"
                        onChange={(e) =>
                            setPassword(e.target.value.trimStart().trimEnd())
                        }
                        value={password}
                    />
                    <button
                        style={{
                            backgroundColor: "#EEF0F4",
                            border: "none",
                            padding: "0",
                        }}
                        onClick={() => setVisibility(!visibility)}>
                        {visibility ? (
                            <>👀</>
                        ) : (
                            <s style={{ color: "black" }}>👀</s>
                        )}
                    </button>
                </div>
                <button
                    style={{
                        color: "black",
                        backgroundColor: "#EEF0F4",
                        border: "none",
                        padding: "0",
                    }}
                    onClick={() => {
                        if (email) {
                            sendPasswordResetEmail(auth, email);
                            alert(
                                `A link to reset your email has been sent at you email ${email}`
                            );
                        } else {
                            alert("Enter a valid email");
                        }
                    }}>
                    Forgot Password?
                </button>
                <button disabled={loading} onClick={handleSubmit}>
                    Log In
                </button>
                {loading && "Logging in, please wait..."}
                {err && <span className="error">Something went wrong</span>}
                <p>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "blue" }}>
                        Register
                    </Link>
                </p>
            </div>
            <footer>
                <small>
                    Made by{" "}
                    <a
                        href="https://github.com/anand-patel-91"
                        target="_blank"
                        rel="noreferrer"
                        title="Visit my Github">
                        Anand Patel
                    </a>
                </small>
            </footer>
        </>
    );
};

export default Login;
