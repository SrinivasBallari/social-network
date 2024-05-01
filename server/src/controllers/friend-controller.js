const {FriendService} = require('../services/index');
const friendService = new FriendService();

const postFriendRequest = async (req,res) => {
    try {
        const { senderId, receiverId } = req.body;
        const response = friendService.postFriendRequest(senderId,receiverId);
        return res.status(201).json({
            message: "successfully created friend request"
        });
    } catch (error) {
        console.log("Error occurred in FriendController.postfriendRequest", error);
        return res.status(500).json({
            message: "some internal server error",
            error: error
        });
    }
}

const respondToFriendRequest = async (req,res) => {
    try {
        const { requestId, response } = req.body;
        const result = friendService.respondToFriendRequest(requestId, response);
        return res.status(200).json({
            message: "successfully responded to friend request"
        });
    } catch (error) {
        console.log("Error occurred in FriendController.respondToFriendRequest", error);
        if(error.message == "Friend request not found"){
            return res.status(404).json({
                message: "error.message",
                error: error
            });
        }
        return res.status(500).json({
            message: "some internal server error",
            error: error
        });
    }
}

module.exports = {
    postFriendRequest,
    respondToFriendRequest
}