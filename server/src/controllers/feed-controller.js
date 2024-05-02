const { FeedService } = require('../services/index');
const feedService = new FeedService();

async function getUserFeed(req, res) {
    const userId = req.user.id; 
    try {
        const feed = await feedService.generateFeed(userId);
        res.json(feed);
    }catch (error) {
        console.error('Error fetching user feed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getUserFeed,
};
