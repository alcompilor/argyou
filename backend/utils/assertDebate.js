import assert from "assert";
import Debate from "../models/debatesModel.js";

const badDebates = new Debate({
    title: "short",
    creatorUsername: null,
    startTime: "2024-05-02",
    endTime: "2024-05-02",
    messages: [
        { content: "bad msg", username: 122, publishDate: "2030-03-30" },
    ],
    thumbnail: "googlelogo.png",
    questions: [
        "Let's have some valid input",
        "Let's have some valid input",
        "Let's have some valid input",
    ],
    status: "Debattörers dag/röd dag",
    comments: [
        {
            username: "Mr.corrupt",
            content:
                "I've broken this debate with invalid inputs and some malicious spices ;)",
            publishDate: "2030-03-30",
        },
    ],
});

let error = badDebates.validateSync();

assert.equal(error.errors["title"].message, "Too short title");
assert.equal(
    error.errors["creatorUsername"].message,
    "Debate creator's id is required",
);
assert.equal(
    error.errors["startTime"].message,
    'Invalid start time format. Please use "00:00" format.',
);
assert.equal(
    error.errors["endTime"].message,
    'Invalid end time format. Please use "00:00" format.',
);
assert.equal(error.errors["status"].message, "Debate state is not supported");

assert.ok(!error.errors["messages"], "Unexpected error for messages");
assert.ok(!error.errors["thumbnail"], "Unexpected error for thumbnail");
assert.ok(!error.errors["questions"], "Unexpected error for questions");
assert.ok(!error.errors["comments"], "Unexpected error for comments");

export default badDebates;
