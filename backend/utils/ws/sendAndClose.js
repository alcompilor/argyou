export const sendAndClose = (ws, message, errorMessage) => {
    ws.send(message, errorMessage);
    ws.close();
};
