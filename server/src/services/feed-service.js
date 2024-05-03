const { PostRepo, UserRepo } = require('../repositories');

class FeedService {

    constructor(){
        this.userRepo = new UserRepo();
        this.postRepo = new PostRepo();
    }

    async generateFeed(userId) {
        try {
            const friends = await this.userRepo.getFriends(userId);
            const friendIds = friends.map(friend => friend._id);
            const feedPosts = await this.postRepo.getPostsByUserIds(friendIds);
            return feedPosts;    
        } catch (error) {
            console.log(error);
            throw error;
        }
    }   

    async getSuggestedUsers(userId){
        try {
            const response = await this.userRepo.getSuggestedUsers(userId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }
}

module.exports = FeedService;
