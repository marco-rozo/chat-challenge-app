import React, { RefObject } from "react";

interface Message {
    user: string;
    text: string;
}

interface ChatMessageAreaProps {
    messages: Message[];
    currentUser: string;
    messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function ChatMessageArea({ messages, currentUser, messagesEndRef }: ChatMessageAreaProps) {
    return (
        <main className="flex-1 max-w-2xl w-full mx-auto p-4 space-y-6 overflow-y-auto">
            {messages.map((msg, index) => {
                const isMe = msg.user === currentUser;

                // Add subtle margin if previous message was from the same sender
                const prevMsg = index > 0 ? messages[index - 1] : null;
                const sameAsPrev = prevMsg?.user === msg.user;

                return (
                    <div key={index} className={`flex w-full ${isMe ? "justify-end" : "justify-start"} ${sameAsPrev ? "-mt-4" : ""}`}>
                        <div
                            className={`
                                max-w-[80%] md:max-w-[70%] px-4 py-2 flex flex-col relative
                                ${isMe
                                    ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-sm"
                                    : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl rounded-tl-sm shadow-sm border border-zinc-100 dark:border-zinc-700"
                                }
                            `}
                        >
                            {!sameAsPrev && !isMe && (
                                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                                    {msg.user}
                                </span>
                            )}
                            <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </main>
    );
}
