const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const questionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        answers: [answerSchema]
    },
    { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
