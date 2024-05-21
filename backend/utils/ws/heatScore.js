import vader from "vader-sentiment";

let messageCount = 0;
let totalIntensity = 0;
let lastUpdateTime = new Date().getTime();

// assess sentiment intensity
function vaderAssess(content) {
    const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(content);
    const normalizedScore = (intensity.compound + 1) / 2;
    return normalizedScore;
}

export function measureHeat(newMessage) {
    const currentTime = new Date().getTime();
    const messageTime = new Date(newMessage.publishDate).getTime();
    const secondsDifference = (currentTime - messageTime) / 1000;

    if (secondsDifference < 300) {

        messageCount++;
        totalIntensity += vaderAssess(newMessage.content);

        if (secondsDifference < 300 && secondsDifference >= 0) {
            lastUpdateTime = currentTime;
        }
    }

    const frequencyRate = messageCount / ((currentTime - lastUpdateTime) / 1000 / 60);
    const averageIntensity = messageCount > 0 ? totalIntensity / messageCount : 0;
    const heatedRate = (frequencyRate + averageIntensity) / 2;

    return heatedRate;
}