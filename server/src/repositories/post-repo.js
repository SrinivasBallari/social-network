const { Post } = require("../models/index");
const CrudRepo = require("./crud-repo");

class PostRepo extends CrudRepo {
    constructor() {
        super(Post);
    }

    async getPostsByUserIds(userIds) {
        try {
            const posts = await Post.find({ user: { $in: userIds } })
                .sort({ createdAt: -1 })
                .populate("user");
            return posts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = PostRepo;
