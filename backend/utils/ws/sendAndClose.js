export const sendAndClose = (ws, message) => {
    ws.send(message);
    ws.close();
};
