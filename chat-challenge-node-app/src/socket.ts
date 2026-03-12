import { Server } from "socket.io";
import { SocketEvent } from "./enums/socket-event.enum";

export const setupSocket = (io: Server) => {
    io.on(SocketEvent.CONNECTION, (socket) => {
        console.log('Cliente conectado:', socket.id);

        // Entrar em uma "sala" específica 
        socket.on(SocketEvent.JOIN_ROOM, (data) => {
            const { room, user } = data;
            socket.join(room);
            console.log(`User ${user} entrou na sala: ${room}`);

            // Avisa aos outros da sala que esse usuário entrou
            socket.to(room).emit(SocketEvent.USER_JOINED, data);
        });

        // Enviar mensagem
        socket.on(SocketEvent.SEND_MESSAGE, (data) => {
            console.log('Mensagem recebida:', data);
            // Envia para todos na sala, incluindo quem enviou
            io.to(data.room).emit(SocketEvent.RECEIVE_MESSAGE, data);
        });

        // Evento customizado de desconexão do chat
        socket.on(SocketEvent.CHAT_DISCONNECT, (data) => {
            console.log(`Usuário ${data.user} desconectou da sala ${data.room}`);
            // Avisar os outros usuários da sala que alguém saiu
            socket.to(data.room).emit(SocketEvent.USER_LEFT, data);
        });

        socket.on(SocketEvent.DISCONNECT, () => {
            console.log("Usuário desconectado", socket.id);
        });
    });
};