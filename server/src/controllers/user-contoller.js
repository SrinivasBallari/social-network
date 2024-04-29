const { UserService } = require("../services/index");
const userService = new UserService();

const register = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        return res.status(201).json({
            message: "registered user successfully",
            data: user,
        });
    } catch (error) {
        console.log("error in UserController.register : ", error);
        if (error.code === 11000) {
            return res.status(409).json({
                message:
                    "User already registered with this email, please login",
                error: error.message,
            });
        }
        return res
            .status(500)
            .json({
                message: "some internal server error occured",
                error: error.message,
            });
    }
};

const login = async (req, res) => {
    try {
        const data = await userService.login(req.body.email, req.body.password);
        return res.status(200).json({
            message: "user logged in successfully",
            token: data.token,
            user: data.user,
        });
    } catch (error) {
        console.log("error in UserController.login : ", error);
        if (
            error.errorMessage == "Incorrect Password" ||
            error.errorMessage == "User Not Found"
        ) {
            return res.status(401).json({
                error: error.errorMessage,
            });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        const response = await userService.isAuthenticated(
            req.headers["auth-token"]
        );
        return res.status(200).json({
            status: "success",
            data: { message: "User is authenticated", userId: response },
        });
    } catch (error) {
        console.log("error in UserController.isAuthenticated : ", error);
        if (error.message == "invalid token") {
            return res
                .status(401)
                .json({ message: "authentication failed : invalid token" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    register,
    login,
    isAuthenticated,
};
