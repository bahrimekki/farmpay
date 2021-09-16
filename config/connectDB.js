const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        });
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected");
    }
};
module.exports = connectDB;
