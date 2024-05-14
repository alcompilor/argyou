export const isDebater = (username, debate) => {
    return (
        debate.creatorUsername === username ||
        debate.opponentUsername === username
    );
};
