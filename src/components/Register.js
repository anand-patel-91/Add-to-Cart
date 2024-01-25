import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [visibility1, setVisibility1] = useState(false);
    const [visibility2, setVisibility2] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        if (!name) {
            alert("Name cannot be empty");
            setLoading(false);
            return;
        }
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

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            user.displayName = name;

            await updateProfile(user, {
                displayName: name,
            });

            await sendEmailVerification(auth.currentUser);

            await signOut(auth);

            navigate("/login");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErr(true);
            alert(error.message);
        }
    };

    return (
        <>
            <h1>Shopping Cart</h1>
            <div className="container">
                <h2>Sign Up</h2>
                <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    onChange={(e) => setName(e.target.value.trimStart())}
                    value={name}
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) =>
                        setEmail(e.target.value.trimStart().toLowerCase())
                    }
                    value={email}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <input
                        type={visibility1 ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        onChange={(e) =>
                            setPassword(e.target.value.trimStart())
                        }
                        value={password}
                    />
                    <button
                        style={{
                            backgroundColor: "#EEF0F4",
                            border: "none",
                            padding: "0",
                        }}
                        onClick={() => setVisibility1(!visibility1)}>
                        {visibility1 ? (
                            <>👀</>
                        ) : (
                            <s style={{ color: "black" }}>👀</s>
                        )}
                    </button>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <input
                        type={visibility2 ? "text" : "password"}
                        placeholder="Confirm password"
                        required
                        onChange={(e) =>
                            setConfirmPassword(e.target.value.trimStart())
                        }
                        value={confirmPassword}
                    />
                    <button
                        style={{
                            backgroundColor: "#EEF0F4",
                            border: "none",
                            padding: "0",
                        }}
                        onClick={() => setVisibility2(!visibility2)}>
                        {visibility2 ? (
                            <>👀</>
                        ) : (
                            <s style={{ color: "black" }}>👀</s>
                        )}
                    </button>
                </div>
                <button disabled={loading} onClick={handleSubmit}>
                    Create Account
                </button>
                {loading && "Creating Account, please wait..."}
                {err && <span className="error">Something went wrong</span>}
                <p>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "blue" }}>
                        Login
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Register;
