import mongoose from "mongoose";

const Schema = mongoose.Schema;

// three questions required
function validateQuestions(questions) {
    return questions.length > 0 && questions.length < 4;
}

const debatesSchema = new Schema({
    title: {
        type: String,
        required: [true, "Debate title is required"],
        minLength: [10, "Too short title"],
        maxLength: 500,
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
    readyDebaters: {
        type: [String],
        default: [],
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
                    minLength: 1,
                    maxLength: 1000,
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
        validate: [validateQuestions, "You are allowed to have between one and three questions."],
    },
    turn: {
        type: String,
        enum: {
            values: ["creator", "opponent", "Open Chat"],
            message: "Fault turn value",
        },
        default: "creator",
    },
    debatedQuestion: {
        type: String,
        default: "",
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
});

const Debate = mongoose.model("debates", debatesSchema);

export default Debate;
