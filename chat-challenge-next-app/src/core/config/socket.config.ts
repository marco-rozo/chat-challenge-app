import { io, Socket } from "socket.io-client";

/**
 * URL base da API (Backend).
 * Pode ser usada futuramente para chamadas fetch/axios tradicionais.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Cria e retorna uma nova instância de conexão com o Socket.IO.
 */
export const createSocketConnection = (): Socket => {
    return io(API_URL);
};
