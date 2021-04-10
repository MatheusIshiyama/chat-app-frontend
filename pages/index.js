import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import api from "../services/api";
import styles from "../css/Home.module.css";
import { io } from "socket.io-client";

export default function Home() {
    const [loaded, loadStatus] = useState(false);
    const [user, setUser] = useState({});
    const [chat, setChat] = useState({
        id: undefined,
        friend: "No chat selected",
    });
    const [friendRequest, setFriendRequest] = useState("");
    const [requests, setRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [lastMessages, setLastMessages] = useState([]);
    const router = useRouter();
    const socket = useRef();

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

            const userInfo = response.data.user;

            if (!userInfo.verified) {
                await router.push("/confirm");
            }

            socket.current = io(process.env.API_URL, {
                query: {
                    token,
                },
            });

            setUser(userInfo);
        } catch (error) {
            localStorage.removeItem("token");
            router.push("/login");
        }

        loadStatus(true);
    }, []);

    if (socket.current) {
        socket.current
            .off("friendsRequests")
            .on("friendsRequests", (requests) => {
                setRequests(requests);
            });
        socket.current.off("friendList").on("friendList", (friends) => {
            setFriends(friends);
        });
        socket.current.off("chatId").on("chatId", (chat) => {
            setChat(chat);
            setMessage("");
        });
        socket.current.off("chatMessages").on("chatMessages", (messages) => {
            setMessages(messages);
        });
        socket.current
            .off("chatLastMessages")
            .on("chatLastMessages", (messages) => {
                setLastMessages(messages);
            });
        socket.current.off("alert").on("alert", (message) => {
            alert(message);
        });
    }

    async function handleLogout() {
        await socket.current.disconnect();
        localStorage.removeItem("token");
        router.push("/login");
    }

    function handleMessage(event) {
        event.preventDefault();

        if (chat.id) {
            socket.current.emit("newMessage", { id: chat.id, message });
        }

        setMessage("");

        const element = document.getElementById("messages");
        element.scrollTop = element.scrollHeight;
    }

    async function handleAddFriend(event) {
        event.preventDefault();

        socket.current.emit("sendFriendRequest", friendRequest);

        setFriendRequest("");
    }

    async function handleAccept(event) {
        event.preventDefault();

        const friend = event.target.value;

        socket.current.emit("acceptFriend", friend);

        setRequests(requests.filter((user) => user.username !== friend));
    }

    async function handleDecline(event) {
        event.preventDefault();

        const friend = event.target.value;

        socket.current.emit("declineFriendRequest", friend);

        setRequests(requests.filter((user) => user.username !== friend));
    }

    async function handleGoToChat(event) {
        event.preventDefault();

        const friend = event.target.value;

        socket.current.emit("chat", friend);
    }

    const requestList = requests.map((request, index) => {
        return (
            <div key={index} className={styles.requestCard}>
                <p>
                    <strong>{request.username}</strong>
                    wants to be your friend
                </p>
                <div>
                    <button
                        value={request.username}
                        onClick={handleAccept}
                        className={styles.accept}
                    >
                        Accept
                    </button>
                    <button
                        value={request.username}
                        onClick={handleDecline}
                        className={styles.decline}
                    >
                        Decline
                    </button>
                </div>
            </div>
        );
    });

    const nonRequestList = (
        <div className={styles.friendCard}>
            <p>No friend requests</p>
        </div>
    );

    function getLastMessage(friendId) {
        const lastChat = lastMessages.filter((message) => {
            return message.id === friendId.toString();
        });

        if (!lastChat.length) {
            return "No messages yet";
        } else {
            return lastChat[0].lastMessage;
        }
    }

    if (!loaded) {
        return <></>;
    } else {
        return (
            <>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h2>Chat app</h2>
                        <div>
                            <p>Logged as</p>
                            <h3>{user.username}</h3>
                        </div>
                        <a onClick={handleLogout} className={styles.button}>
                            Logout
                        </a>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.chat}>
                            <h2>{chat.friend}</h2>
                            <div id="messages" className={styles.messages}>
                                {messages.map((message, index) => {
                                    if (message.by === user._id) {
                                        return (
                                            <div
                                                key={index}
                                                className={styles.user}
                                            >
                                                <div>
                                                    <p>{message.message}</p>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div
                                                key={index}
                                                className={styles.friend}
                                            >
                                                <div>
                                                    <p>{message.message}</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            <form
                                action=""
                                onSubmit={handleMessage}
                                className={styles.sendMessage}
                            >
                                <input
                                    type="text"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={
                                        chat.id
                                            ? message
                                            : "Select a chat before type a message"
                                    }
                                    className={styles.message}
                                />
                                <input
                                    type="submit"
                                    value="Send message"
                                    className={styles.button}
                                />
                            </form>
                        </div>
                        <div className={styles.friends}>
                            <h2>Friend List</h2>
                            <div className={styles.addFriend}>
                                <input
                                    value={friendRequest}
                                    onChange={(e) =>
                                        setFriendRequest(e.target.value)
                                    }
                                />
                                <button onClick={handleAddFriend}>
                                    add friend
                                </button>
                            </div>
                            <div className={styles.friendsCards}>
                                {requests.length ? requestList : nonRequestList}
                                {friends.map((friend, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={styles.card}
                                        >
                                            <div className={styles.cardHeader}>
                                                <div>
                                                    <h3>{friend.name}</h3>
                                                    <h4>@{friend.username}</h4>
                                                </div>
                                                <button
                                                    onClick={handleGoToChat}
                                                    value={friend.username}
                                                >
                                                    Go to chat
                                                </button>
                                            </div>
                                            <div className={styles.cardBody}>
                                                <p className={styles.title}>
                                                    Last Message
                                                </p>
                                                <p className={styles.message}>
                                                    {getLastMessage(friend.id)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <p>Copyright © 2021 Matheus Ishiyama. All Rights Reserved.</p>
                    </div>
                </div>
            </>
        );
    }
}
