const { FriendRepo, UserRepo } = require("../repositories/index");

class FriendService {
    constructor() {
        this.friendRepo = new FriendRepo();
        this.userRepo = new UserRepo();
    }

    async postFriendRequest(senderId, receiverId) {
        try {
            const sender = await this.userRepo.read(senderId);
            const receiver = await this.userRepo.read(receiverId);
            if (!sender || !receiver) {
                throw { message: "Sender or receiver not found" };
            }

            const newRequest = await this.friendRepo.create({
                sender: senderId,
                receiver: receiverId,
            });

            receiver.friendRequests.push(newRequest._id);
            await receiver.save();
        } catch (error) {
            console.log(
                "Error occurred in  FriendService.postFriendRequest",
                error
            );
            throw error;
        }
    }

    async respondToFriendRequest(requestId, response) {
        try {
            const friendRequest = await this.friendRepo.read(requestId);
            if (!friendRequest) {
                throw { message: "Friend request not found" };
            }

            if (response === "accept") {
                const sender = await this.userRepo.read(friendRequest.sender);
                const receiver = await this.userRepo.read(friendRequest.receiver);

                sender.friends.push(receiver._id);
                receiver.friends.push(sender._id);
                receiver.friendRequests.pull(requestId);

                await sender.save();
                await receiver.save();
                friendRequest.status = "accepted";

            } else if (response === "reject") {
                const receiver = await this.userRepo.read(friendRequest.receiver);
                receiver.friendRequests.pull(requestId);
                await receiver.save();
                friendRequest.status = "rejected";

            } else {
                throw ({ error: "invalid response" });
            }
            await friendRequest.save();
            return {
                message: "successfully responded to the friend request",
            };
        } catch (error) {
            console.log(
                "Error occurred in FriendService.respondToFriendRequest",
                error
            );
            throw error;
        }
    }
}

module.exports = FriendService;
