const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    MONGO_CONNECTION_URL : process.env.MONGO_CONNECTION_URL_DEV
}

