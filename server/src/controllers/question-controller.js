const { QuestionService } = require("../services/index");
const questionService = new QuestionService();

const askQuestion = async (req, res) => {
    try {
        const createdQuestion = await questionService.askQuestion(
            req.user.id,
            req.body.question
        );
        return res.status(200).json(createdQuestion);
    } catch (error) {
        console.log("Error in asking question:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const answerQuestion = async (req, res) => {
    try {
        const updatedQuestion = await questionService.addAnswer(
            req.params.questionId,
            req.query.user,
            req.body.text
        );
        res.json(updatedQuestion);
    } catch (error) {
        console.log("Error in adding answer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    askQuestion,
    answerQuestion,
};
