const CrudRepo = require("./crud-repo");
const { User } = require("../models/index");

class UserRepo extends CrudRepo {
    constructor() {
        super(User);
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({
                email: email,
            });
            return user;
        } catch (error) {
            console.log("Error in User repo", error);
            throw error;
        }
    }

    async getFriends(userId) {
        try {
            const user = await User.findById(userId).populate("friends");
            return user.friends;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getSuggestedUsers(userId) {
        try {
            const currentUser = await User.findById(userId);
            const suggestedUsers = await User.find({
                _id: { $nin: currentUser.friends },
                _id: { $ne: userId } 
            });
            return suggestedUsers;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserRepo;
