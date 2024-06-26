const { UserRepo } = require("../repositories/index");
const { JWT_KEY } = require("../config/server-config");
const cloudinary = require("../config/cloudinary-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");const { SALT } = require("../config/server-config");

class UserService {
    constructor() {
        this.userRepo = new UserRepo();
    }

    #validatePassword(userInputPassword, hashedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword, hashedPassword);
        } catch (error) {
            console.log("Error occured in validating password", error);
            throw { error };
        }
    }

    #verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Error occured in validating token", error);
            throw error;
        }
    }

    #createToken(user) {
        try {
            const createdToken = jwt.sign(user, JWT_KEY, { expiresIn: "3d" });
            return createdToken;
        } catch (error) {
            console.log("Error occured in creating token");
            throw error;
        }
    }

    async register(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, SALT);
            data.password = hashedPassword;
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
                throw { errorMessage: "User Not Found" };
            }
            const isPasswordValid = this.#validatePassword(
                plainPassword,
                user.password
            );
            if (!isPasswordValid) {
                throw { errorMessage: "Incorrect Password" };
            }
            const token = this.#createToken({
                email: user.email,
                id: user._id,
            });
            return {
                token,
                user,
            };
        } catch (error) {
            console.log("error occurred in UserService.login: ", error);
            throw error;
        }
    }

    async uploadBankStatements(userId,files) {
        try {
            const user = await this.userRepo.read(userId);
            if (!user) {
                throw({message: "User not found"});
            }

            const uploadedFiles = [];
            for (const file of files) {
                const result = await cloudinary.uploader.upload(file.path);
                uploadedFiles.push(result.secure_url);
            }

            user.bankStatements.push(...uploadedFiles);
            await user.save();

            return uploadedFiles;
        } catch (error) {
            console.log("error occurred in UserService.login: ", error);
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.#verifyToken(token);
            return response.id;
        } catch (error) {
            console.log("Error occured in user service layer ");
            throw error;
        }
    }

    async updateIndustryField(userId, data) {
        try {
            const response = await this.userRepo.update(userId, data);
            return response;
        } catch (error) {
            console.log(
                "error occurred in UserService.updateIndustryField: ",
                error
            );
            throw error;
        }
    }

    async updateUserProfile(userId, data) {
        try {
            const response = await this.userRepo.update(userId, data);
            return response;
        } catch (error) {
            console.log(
                "error occurred in UserService.updateUserProfile: ",
                error
            );
            throw error;
        }
    }
}

module.exports = UserService;
