const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: { type: String, required: true },
        },
    ],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
