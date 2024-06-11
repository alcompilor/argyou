import { WebSocket } from "ws";

export const broadcastMessage = (
    ws,
    roomId,
    message,
    isBinary,
    activeConnections,
) => {
    activeConnections.get(roomId)?.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            const data = isBinary ? message : JSON.parse(message);
            client.send(data);
        }
    });
};
