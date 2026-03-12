import express, { Application, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupSocket } from './socket';

const app: Application = express();
const PORT: number = 8000;

// Configurar CORS para permitir que o frontend se conecte
app.use(cors());
app.use(express.json());

// Criar o servidor HTTP a partir do app Express
const server = http.createServer(app);

// Inicializar o Socket.IO com configurações de CORS
const io = new Server(server, {
    cors: {
        origin: "*", // Permitir de qualquer origem (em produção, especifique a URL do frontend)
        methods: ["GET", "POST"]
    }
});

// Chamar a função de configuração dos sockets
setupSocket(io);

app.get('/', (req: Request, res: Response) => {
    console.log('Servidor Express funcionando!');
    console.log('Teste debug');
    res.send('Servidor Express + Socket.IO funcionando!');
});

// Iniciar o servidor com server.listen em vez de app.listen
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
