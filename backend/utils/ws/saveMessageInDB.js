import { measureHeat } from "./heatScore.js";

export const saveMessageInDB = async (username, message, isBinary, debate) => {
    const messageObject = {
        content: isBinary ? message : JSON.parse(message),
        username,
        publishDate: new Date(),
    };

    debate.messages.push(messageObject);
    //debate.heatScore = measureHeat(messageObject);
    await debate.save();
};
