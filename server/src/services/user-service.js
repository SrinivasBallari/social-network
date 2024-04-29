const { UserRepo } = require('../repositories/index');
const { JWT_KEY } = require('../config/server-config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {

    constructor() {
        this.userRepo = new UserRepo();
    }

    #validatePassword(userInputPassword,hashedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword,hashedPassword);
        } catch (error) {
            console.log("Error occured in validating token",error);
            throw({error});
        }
    }

    #verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Error occured in validating token",error);
            throw(error);
        }
    }

    #createToken(user) {
        try {
            const createdToken = jwt.sign(user, JWT_KEY, {expiresIn: '3d'});
            return createdToken;
        } catch (error) {
            console.log("Error occured in creating token");
            throw(error);
        }    
    }

    async register(data) {
        try {
            const user = await this.userRepo.create(data);
            return user;
        } catch (error) {
            console.log("error occurred in UserService.register: ", error);
            throw error;
        }
    }

    async login(email, plainPassword) {
        try {
            const user = await this.userRepo.getUserByEmail(email);
            if (!user) {
                throw({errorMessage: "User Not Found"});
            }
            const isPasswordValid = this.#validatePassword(plainPassword, user.password);
            if (!isPasswordValid) {
                throw({errorMessage: "Incorrect Password"});
            }
            const token = this.#createToken({email:user.email,id:user._id});
            return {
                token,
                user
            };
        } catch (error) {
            console.log("error occurred in UserService.login: ", error);
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.#verifyToken(token);
            return response.id;
        } catch (error) {
            console.log("Error occured in user service layer ");
            throw(error);
        }
    }

}

module.exports = UserService;

