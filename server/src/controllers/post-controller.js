const {PostService} = require('../services/index');
const postService = new PostService();

const createPost = async (req,res) => {
    try {
        const response = await postService.createPost(req.user.id,req.body.content,req.files);
        return res.status(200).json({
            status: "success",
            data: { message: "post created successfully" , post : response},
        });
    } catch (error) {
        console.log("error in PostController.post : ", error);
        if (error.message == "User not found") {
            return res
                .status(404)
                .json({ message: "User not found" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createPost
}