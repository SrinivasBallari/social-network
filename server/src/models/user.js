const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bankStatements: [String],
        industry: {
            type: String,
            enum: [
                "Finance",
                "Advertising",
                "Software Technology",
                "Media and Broadcasting",
                "Pharmacy",
                "Healthcare and Biotechnology",
            ],
        },
        interests: [{ type: String }],
        username: {
            type: String,
            required: true,
            unique: true,
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
