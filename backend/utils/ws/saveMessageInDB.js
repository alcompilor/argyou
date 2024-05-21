import { measureHeat } from "./heatScore";

export const saveMessageInDB = async (username, message, isBinary, debate) => {
    const messageObject = {
        content: isBinary ? message : message.toString(),
        username,
        publishDate: new Date(),
    };

    debate.messages.push(messageObject);
    debate.heatScore = measureHeat();
    await debate.save();
};
