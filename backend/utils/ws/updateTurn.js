export const UpdateTurn = async (turn, debatedQuestion, debate) => {
    try {
        debate.turn = turn;
        debate.debatedQuestion = debatedQuestion;
        await debate.save();
    } catch (error) {
        console.error(error);
    }
};
