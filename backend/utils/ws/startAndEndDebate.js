export const StartDebate = async (debate) => {
    try {
        debate.status = "Ongoing";
        await debate.save();
    } catch (error) {
        console.log(error);
    }
};

export const EndDebate = async (debate) => {
    try {
        debate.status = "Ended";
        await debate.save();
    } catch (error) {
        console.log(error);
    }
}