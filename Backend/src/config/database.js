const mongoose = require("mongoose");

async function connectToDb() {
    try {
        console.log("Connecting to Database...")
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        })
        console.log("Connected to Database ")
    }
    catch (err) {
        console.error("Database Connection Error")
        console.error(err.message)
    }


}
module.exports = connectToDb;