import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../services/api";

export default function Home() {
    const [loaded, loadStatus] = useState(false);
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

            if (!user.verified) {
                await router.push("/confirm");
            }
        } catch (error) {
            localStorage.removeItem("token");
            router.push("/login");
        }

        loadStatus(true);
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/login");
    }

    if (!loaded) {
        return <></>;
    } else {
        return (
            <>
                <div>Home</div>
                <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                    logout
                </a>
            </>
        );
    }
}
