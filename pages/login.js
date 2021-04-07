import React, { useEffect, useState } from "react";
import styles from "../css/Login.module.css";
import api from "../services/api";
import { useRouter } from "next/router";

export default function Login() {
    const [loaded, loadStatus] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            await router.push("/login");
        }

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
        loadStatus(true);
    }, []);

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post("auth", { username, password });
            const { token } = response.data;
            localStorage.setItem("token", token);
            router.push("/");
        } catch (error) {
            console.log("error: ", error);
        }
    }

    if (!loaded) {
        return <></>;
    } else {
        return (
            <div className={styles.body}>
                <div className={styles.card}>
                    <h2>Chat App</h2>
                    <h3>LOGIN</h3>
                    <form onSubmit={handleLogin} className={styles.form}>
                        <div>
                            <h4>username</h4>
                            <input
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <h4>password</h4>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <input
                            type="submit"
                            className={styles.button}
                            value="Login"
                        />
                    </form>
                    <p>Don't have an account?</p>
                    <a href="/register" className={styles.signin}>
                        Sign in
                    </a>
                </div>
            </div>
        );
    }
}
