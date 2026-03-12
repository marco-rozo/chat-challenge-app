"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Socket } from "socket.io-client";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ChatHeader } from "../../../components/chat/ChatHeader";
import { ChatMessageArea } from "../../../components/chat/ChatMessageArea";
import { ChatInputArea } from "../../../components/chat/ChatInputArea";
import { createSocketConnection } from "../../../core/config/socket.config";
import { ChatEvents } from "../../../core/enums/chat-events.enum";
import { CHAT_ROOM } from "../../../core/consts/chat.consts";

interface ChatPageProps {
    params: Promise<{ user: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
    const { user } = React.use(params);
    const router = useRouter();
    const currentUser: string = user === "user-a" ? "User A" : "User B";
    const otherUser: string = user === "user-a" ? "User B" : "User A";
    const [otherUserStatus, setOtherUserStatus] = useState<string>("Offline");

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<{ user: string, text: string }[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const initialMessages = [
        { user: "User A", text: "Olá, User B. Tudo bem?" },
        { user: "User B", text: "Tudo bem e contigo?" },
        { user: "User A", text: "Que bom! Estou ótimo!" },
        { user: "User A", text: "Como vai no trabalho?" },
        { user: "User B", text: "Vai bem!" },
        { user: "User B", text: "Estamos com um novo projeto em andamento" }
    ];

    useEffect(() => {
        setIsMounted(true);
        // Initial messages
        setMessages(initialMessages);

        // Inicializar a conexão com o Socket.IO de forma centralizada
        const newSocket = createSocketConnection();
        setSocket(newSocket);

        // Entrar na mesma sala para os dois usuários
        newSocket.emit(ChatEvents.JOIN_ROOM, { room: CHAT_ROOM, user: currentUser });

        // Escutar novas mensagens (Lidando com a duplicação removendo listers duplicados)
        const messageHandler = (data: { user: string; text: string; room: string }) => {
            setMessages((prev) => [...prev, data]);
            if (data.user !== currentUser) {
                setOtherUserStatus("Online");
            }
        };

        const disconnectHandler = (data: { user: string; room: string }) => {
            toast.info(`O ${data.user} saiu da sala.`);
            setOtherUserStatus("Offline");
        };

        const joinHandler = (data: { user: string; room: string }) => {
            toast.info(`O ${data.user} entrou na sala.`);
            setOtherUserStatus("Online");
        };

        newSocket.on(ChatEvents.RECEIVE_MESSAGE, messageHandler);
        newSocket.on(ChatEvents.USER_LEFT, disconnectHandler);
        newSocket.on(ChatEvents.USER_JOINED, joinHandler);

        // Limpar a conexão quando o componente for desmontado
        return () => {
            newSocket.off(ChatEvents.RECEIVE_MESSAGE, messageHandler);
            newSocket.off(ChatEvents.USER_LEFT, disconnectHandler);
            newSocket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() === "" || !socket) return;

        const messageData = {
            user: currentUser,
            text: newMessage,
            room: CHAT_ROOM
        };

        // Emitir mensagem para o backend
        socket.emit(ChatEvents.SEND_MESSAGE, messageData);

        // Limpar o campo de texto local
        setNewMessage("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleDisconnect = () => {
        if (socket) {
            socket.emit(ChatEvents.CHAT_DISCONNECT, { user: currentUser, room: CHAT_ROOM });
            socket.disconnect();
        }
        router.push("/");
    };

    if (!isMounted) {
        return (
            <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Header */}
            <ChatHeader
                otherUser={otherUser}
                otherUserStatus={otherUserStatus}
                onDisconnect={handleDisconnect}
            />

            {/* Chat Area */}
            <ChatMessageArea
                messages={messages}
                currentUser={currentUser}
                messagesEndRef={messagesEndRef}
            />

            {/* Input Area */}
            <ChatInputArea
                newMessage={newMessage}
                onMessageChange={setNewMessage}
                onKeyDown={handleKeyDown}
                onSendMessage={handleSendMessage}
            />

            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                theme="dark"
                transition={Zoom}
            />
        </div>
    );
}
