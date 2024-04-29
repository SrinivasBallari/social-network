const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {SALT} = require('../config/server-config');

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

userSchema.pre("save", async function (next) {
    const user = this;
    try {
        const hashedPassword = await bcrypt.hash(user.password, SALT);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
