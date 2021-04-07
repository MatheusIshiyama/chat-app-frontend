import React, { useEffect, useState } from "react";
import styles from "../css/Register.module.css";
import api from "../services/api";
import { useRouter } from "next/router";

export default function Register() {
    const [loaded, loadStatus] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const router = useRouter();

    useEffect(async () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const response = await api.get("/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { user } = response.data;

                if (user) {
                    await router.push("/");
                }
            } catch (error) {
                localStorage.removeItem("token");
            }
        }
        
        loadStatus(true);
    }, []);

    async function handleRegister(event) {
        event.preventDefault();

        try {
            const response = await api.post("/user/register", {
                username,
                name,
                email,
                password,
                checkPassword,
            });
            const { token } = response.data;

            localStorage.setItem("token", token);
            router.push("/confirm");
        } catch (error) {
            alert("Error to register user");
        }
    }

    if (!loaded) {
        return <></>;
    } else {
        return (
            <div className={styles.body}>
                <div className={styles.card}>
                    <h2>Chat app</h2>
                    <h3>Sign in</h3>
                    <form onSubmit={handleRegister}>
                        <div className={styles.doubleInput}>
                            <div>
                                <label>name</label>
                                <input
                                    type="text"
                                    minLength="3"
                                    maxLength="16"
                                    title="Must contain at least 3 and max 16 characters"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>username</label>
                                <input
                                    type="text"
                                    minLength="4"
                                    maxLength="16"
                                    title="Must contain at least 4 and max 16 characters"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.oneInput}>
                            <label>email</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.doubleInput}>
                            <div>
                                <label>password</label>
                                <input
                                    type="password"
                                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}"
                                    title="Must contain at least one number and one uppercase and lowercase letter, one symbol and at least 8 and max 16 characters"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label>confirm password</label>
                                <input
                                    type="password"
                                    pattern={password}
                                    title="Passwords doesn't match"
                                    onChange={(e) =>
                                        setCheckPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <input
                            type="submit"
                            value="Sign in"
                            className={styles.button}
                        />
                    </form>
                    <p>Have an account?</p>
                    <a href="/login">Sign up</a>
                </div>
            </div>
        );
    }
}
