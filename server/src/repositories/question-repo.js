const CrudRepo = require("./crud-repo");
const {Question} = require("../models/index");

class QuestionRepo extends CrudRepo{
    
    constructor(){
        super(Question);
    }

    async addAnswer(questionId, answerData) {
        try {
            const question = await Question.findById(questionId);
            if (!question) {
                throw new Error("Question not found");
            }
            question.answers.push(answerData);
            await question.save();
            return question;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = QuestionRepo;
