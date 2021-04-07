import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../css/Confirm.module.css";
import api from "../services/api";

export default function Confirm() {
    const [loaded, loadStatus] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
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

            if (user.verified) {
                await router.push("/");
            }

            setName(user.name);
            setUsername(user.username);
        } catch (error) {
            localStorage.removeItem("token");
            router.push("/login");
        }
        loadStatus(true);
    }, []);

    async function handleValidate() {
        if (code.length !== 8) {
            alert("Invalid code");
        }

        try {
            const response = await api.post("/user/confirm", {
                username,
                code,
            });
            console.log(response);
        } catch (error) {
            console.log("error", error);
        }
    }

    if (!loaded) {
        return <></>;
    } else {
        return (
            <div className={styles.body}>
                <div className={styles.card}>
                    <h2>Chat app</h2>
                    <div className={styles.user}>
                        <h3>{name}</h3>
                        <h4>@{username}</h4>
                    </div>
                    <form onSubmit={handleValidate}>
                        <label>Enter your verify code provided on email.</label>
                        <input
                            className={styles.input}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                        <input
                            type="submit"
                            value="Validate"
                            className={styles.button}
                        />
                    </form>
                </div>
            </div>
        );
    }
}
