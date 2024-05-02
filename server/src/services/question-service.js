const { QuestionRepo } = require("../repositories/index");

class QuestionService {
    constructor() {
        this.questionRepo = new QuestionRepo();
    }

    async askQuestion(user, question) {
        try {
            const createdQuestion = await this.questionRepo.create({
                user,
                question,
            });
            return createdQuestion;
        } catch (error) {
            throw error;
        }
    }

    async addAnswer(questionId, user, text) {
        try {
            const answerData = { user, text };
            const updatedQuestion = await this.questionRepo.addAnswer(
                questionId,
                answerData
            );
            return updatedQuestion;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = QuestionService;
