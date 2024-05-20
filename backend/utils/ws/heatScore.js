import vader from "vader-sentiment";

function vaderAssess() {
    const intensity = vader.SentimentIntensityAnalyzer.polarity_scores("What a terrible experience!");
    return intensity;
}

const debate = {
    title: "debate title",
    creatorUsername: "debateCreator",
    startTime: "2024-05-20T20:00:00.000+00:00",
    questions: ["Q1, Q2, Q3"],
    messages: [
        {
            content: "It's the first message",
            username: "debateCreator",
            publishDate: "2024-05-20T20:00:10.000+00:00",
        },
        {
            content: "It's the first message",
            username: "debateOpponent",
            publishDate: "2024-05-20T20:00:20.000+00:00",
        }
    ]
}

function messagesFrequency() {

}

export const calculateHeatScore = (messageObject, debate) => {
    
};

vaderAssess();