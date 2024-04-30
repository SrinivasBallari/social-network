const { JWT_KEY } = require("../config/server-config");
const jwt = require("jsonwebtoken");

const validateAuthToken = (req, res, next) => {
    if (!req.headers["auth-token"]) {
        return res.status(403).json({
            msg: "Auth token not found",
        });
    }
    
    try {
        const token = req.headers["auth-token"];
        const userData = jwt.verify(token, JWT_KEY);
        req.user = userData;
        next();
    } catch (error) {
        console.log("Error occured in validating token",error);
        throw(error);
    }
};

module.exports = {
    validateAuthToken
}
