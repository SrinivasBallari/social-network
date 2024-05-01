const { PostRepo } = require("../repositories/index");
const cloudinary = require('../config/cloudinary-config');

class PostService {
    constructor() {
        this.postRepo = new PostRepo();
    }

    async createPost(user, content, media) {
        try {
            let mediaUrls = [];

            for (const file of media) {
                const result = await cloudinary.uploader.upload(file.path);
                mediaUrls.push(result.secure_url);
            }

            const post = await this.postRepo.create({ user, content, media: mediaUrls });
            return post;
        } catch (error) {
            console.log("error occurred in PostService.createPost: ", error);
            throw error;
        }
    }
}

module.exports = PostService;
