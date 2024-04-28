const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    MONGO_CONNECTION_URL_DEV : process.env.MONGO_CONNECTION_URL_DEV,
    MONGO_CONNECTION_URL_PROD: process.env.MONGO_CONNECTION_URL_PROD
}

