import mongoose from "mongoose";

const Schema = mongoose.Schema;

// three questions required
function validateQuestions(questions) {
    return questions.length === 3;
}

const debatesSchema = new Schema({
    title: {
        type: String,
        required: [true, "Debate title is required"],
        minLength: [20, "Too short title"],
        maxLength: 100,
    },
    creatorUsername: {
        type: String,
        ref: "users",
    },
    opponentUsername: {
        type: String,
        ref: "users",
        validate: {
            validator: function (opponentUsername) {
                return opponentUsername !== this.creatorUsername;
            },
            message:
                "You can't be a debate creator and an opponent at the same time",
        },
    },
    owner: {
        type: String,
        default: function () {
            return this.creatorUsername;
        },
    },
    startTime: {
        type: Date,
        required: [true, "Predefined start time is needed"],
    },
    endTime: {
        type: Date,
    },
    messages: {
        type: [
            {
                content: {
                    type: String,
                    required: true,
                    minLength: 10,
                    maxLength: 500,
                },
                username: {
                    type: String,
                    required: true,
                    ref: "users",
                },
                publishDate: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    heatScore: {
        type: Number,
        min: 0,
        max: 10
    },
    thumbnail: {
        buffer: Buffer,
        mime: String,
    },
    questions: {
        type: Array,
        required: true,
        validate: [validateQuestions, "There should be three questions"],
    },
    status: {
        type: String,
        enum: {
            values: ["Waiting Participant", "Ongoing", "Shookhands", "Ended"],
            message: "Debate state is not supported",
        },
        default: "Waiting Participant",
    },
    comments: {
        type: [
            {
                username: {
                    type: String,
                    required: true,
                    ref: "users",
                },
                content: {
                    type: String,
                    required: true,
                    minLength: 5,
                    maxLength: 500,
                },
                publishDate: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    views: {
        type: Number,
    }
});

const Debate = mongoose.model("debates", debatesSchema);

export default Debate;
