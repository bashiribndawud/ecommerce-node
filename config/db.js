const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.MONGO_URI;

const connectDB = async () => {
    try {
    mongoose.set("strictQuery", false);
       mongoose.connect(DB_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
       console.log('Connected to database');
    } catch (error) {
       console.log(error.message)
       process.exit();
    }
}

module.exports = connectDB