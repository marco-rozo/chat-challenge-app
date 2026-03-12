import React from "react";

interface ChatHeaderProps {
    otherUser: string;
    otherUserStatus: string;
    onDisconnect: () => void;
}

export function ChatHeader({ otherUser, otherUserStatus, onDisconnect }: ChatHeaderProps) {
    return (
        <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 sticky top-0 z-10 shadow-sm">
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                        {otherUser.charAt(5) || otherUser.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                            {otherUser}
                        </h1>
                        <p className={`text-xs font-medium ${otherUserStatus === "Online" ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
                            {otherUserStatus}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onDisconnect}
                    className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"
                >
                    Sair
                </button>
            </div>
        </header>
    );
}
