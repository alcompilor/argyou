import mongoose from "mongoose";
import assert from "assert";

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

const badDebates = new Debate({
    title: "short",
    creatorUsername: null,
    startTime: "2024-05-02",
    endTime: "2024-05-02",
    messages: [{content:"bad msg", username: 122, publishDate: "2030-03-30"}],
    thumbnail: "googlelogo.png",
    questions: ["It perhaps should be enough with two questions ;)", "I'm not giving three questions :(", "I'm not giving three questions :("],
    status: "Debattörers dag/röd dag",
    comments: [{username: "Mr.corrupt", content: "I've broken this debate with invalid inputs and some malicious spices ;)", publishDate: "2030-03-30"}]
});

let error = badDebates.validateSync();

assert.equal(error.errors['title'].message, "Too short title");
assert.equal(error.errors['creatorUsername'].message, "Debate creator's id is required");
assert.equal(error.errors['startTime'].message, 'Invalid start time format. Please use "00:00" format.');
assert.equal(error.errors['endTime'].message, 'Invalid end time format. Please use "00:00" format.');
assert.equal(error.errors['status'].message, "Debate state is not supported");

assert.ok(!error.errors['messages'], 'Unexpected error for messages');
assert.ok(!error.errors['thumbnail'], 'Unexpected error for thumbnail');
assert.ok(!error.errors['questions'], 'Unexpected error for questions');
assert.ok(!error.errors['comments'], 'Unexpected error for comments');

export default Debate;