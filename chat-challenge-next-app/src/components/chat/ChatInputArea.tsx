import { ChangeEvent, KeyboardEvent } from "react";

interface ChatInputAreaProps {
    newMessage: string;
    onMessageChange: (val: string) => void;
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    onSendMessage: () => void;
}

export function ChatInputArea({ newMessage, onMessageChange, onKeyDown, onSendMessage }: ChatInputAreaProps) {
    return (
        <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 sticky bottom-0">
            <div className="max-w-2xl mx-auto flex items-end gap-2">
                <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 py-2 sm:py-3 border border-zinc-200 dark:border-zinc-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                    <textarea
                        rows={1}
                        placeholder="Escreva uma mensagem..."
                        value={newMessage}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onMessageChange(e.target.value)}
                        onKeyDown={onKeyDown}
                        className="w-full bg-transparent border-none resize-none focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 max-h-32"
                    />
                </div>
                <button
                    onClick={onSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full p-2 sm:p-3 h-10 w-10 sm:h-auto sm:w-auto flex items-center justify-center transition-colors shadow-sm flex-shrink-0"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </button>
            </div>
        </footer>
    );
}
