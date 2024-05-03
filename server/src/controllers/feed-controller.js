const { FeedService } = require('../services/index');
const feedService = new FeedService();

async function getUserFeed(req, res) {
    const userId = req.user.id; 
    try {
        const feed = await feedService.generateFeed(userId);
        return res.status(200).json(feed);
    }catch (error) {
        console.error('Error fetching user feed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getSuggestedUsers(req, res) {
    const userId = req.user.id;
    try {
        const suggestedUsers = await feedService.getSuggestedUsers(userId);
        return res.status(200).json(suggestedUsers);
    } catch (error) {
        console.error('Error fetching suggested users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getUserFeed,
    getSuggestedUsers
};
