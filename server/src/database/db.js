const mongoose = require("mongoose");  // <== Add this line
require('dotenv').config();

async function connectDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/kazam-db", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is connected");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); 
    }
}

connectDatabase().catch(err => console.error(err));

module.exports = connectDatabase;
