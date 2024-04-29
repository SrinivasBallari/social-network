const CrudRepo = require("./crud-repo");
const { User } = require('../models/index');

class UserRepo extends CrudRepo{

    constructor(){
        super(User);
    }

    async getUserByEmail(email) {
        try {
            const user = User.findOne({
                email: email
            });
            return user;
        } catch (error) {
            console.log("Error in User repo",error);
            throw(error);
        }
    }

}

module.exports = UserRepo;