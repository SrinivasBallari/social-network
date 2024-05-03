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
            default: null,
        },
        interests: [{ type: String }],
        username: {
            type: String,
            default: null,
        },
        friendRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FriendRequest",
            },
        ],
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
