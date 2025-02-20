const mongoose = require("mongoose");  // <== Add this line
require('dotenv').config();

async function connectDatabase() {
    try {
        // "mongodb+srv://sarfaraz22072000:<db_password>@kazam-db.tmbpw.mongodb.net/"
        // process.env.MONGO_URL || "mongodb://localhost:27017/kazam-internal-db")
        await mongoose.connect("mongodb://localhost:27017/kazam-internal-db");
        console.log("Database is connected");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); 
    }
}

connectDatabase().catch(err => console.error(err));

module.exports = connectDatabase;
