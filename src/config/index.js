const dotenv = require('dotenv');
dotenv.config();

const config = {
    port: process.env.SERVER_PORT
}

module.exports = config;