import mongoose from "mongoose";

const Schema = mongoose.Schema;

// 00:00 time format
function validateTime(startTime) {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(startTime);
}

// three questions required
function validateQuestions(questions) {
    return questions.length === 3;
}

// thumbnail of type buffer
function validateThumbnail(thumbnail) {
    if (!Buffer.isBuffer(thumbnail)) {
        throw new Error('Thumbnail must be stored as a binary buffer');
    }
}

const debatesSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Debate title is required'],
        minLength: [20, 'Too short title'],
        maxLength: 100,
    },
    creatorUsername: {
        type: String,
        required: [true, "Debate creator's id is required"],
        ref: 'users'
    },
    opponentUsername: {
        type: String, 
        ref: 'users'
    },
    startTime: {
        type: String,
        required: [true, 'Predefined start time is needed'],
        validate: [validateTime, 'Invalid start time format. Please use "00:00" format.'],
    },
    endTime: {
        type: String,
        validate: [validateTime, 'Invalid end time format. Please use "00:00" format.'],
    },
    messages: {
        type: [{
            content: {
                type: String,
                required: true,
                minLength: 10,
                maxLength: 500
            },
            username: {
                type: String,
                required: true,
                ref: 'users',
            },
            publishDate: {
                type: Date,
                default: Date.now
            }
        }]
    },
    thumbnail: {
        type: Buffer,
        required: [true, 'A thumbnail is required'],
        validate: [validateThumbnail, 'A thumbnail required']
    },
    questions: {
        type: Array,
        required: true,
        validate: [validateQuestions, 'There should be three questions']
    },
    status: {
        type: String,
        enum: {
            values: ['Waiting Participant', 'Ongoing', 'Shookhands', 'Ended'],
            message: 'Debate state is not supported'
        },
        default: "Waiting Participant"
    },
    comments: {
        type: [{
            username: {
                type: String,
                required: true,
                ref: 'users',
            },
            content: {
                type: String,
                required: true,
                minLength: 5,
                maxLength: 500
            },
            publishDate: {
                type: Date,
                default: Date.now
            }
        }]
    }
});

// prevent user from entering own time
debatesSchema.path('messages').set(function(messages) {
    messages.forEach(message => {
        message.publishDate = this.isNew ? message.publishDate : Date.now();
    });
    return messages;
});

debatesSchema.path('comments').set(function(comments) {
    comments.forEach(comment => {
        comment.publishDate = this.isNew ? comment.publishDate : Date.now();
    });
    return comments;
});

const Debate = mongoose.model('debates', debatesSchema);

export default Debate;