const path = require("path"); require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
module.exports = { port: process.env.PORT || 5000, nodeEnv: process.env.NODE_ENV || "development", databaseUrl: process.env.DATABASE_URL, jwtSecret: process.env.JWT_SECRET };
