import { WebSocketServer } from 'ws';

const PORT = 3001;

const ws = new WebSocketServer({ port: PORT });

ws.on('connection', (socket, req) => {
    
    console.log(`connection from ${ req.socket.remoteAddress }`);

    socket.on('close', () => {
        console.log(`disconnection from ${ req.socket.remoteAddress }`);
    });
});