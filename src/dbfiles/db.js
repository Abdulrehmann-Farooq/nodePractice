require('dotenv').config();
const mongoose = require('mongoose');

//taking values from the .env file
const username = process.env.DB_USERNAME;
const password = encodeURIComponent(process.env.DB_PASSWORD);
const clustername = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;


const connectionString = `mongodb+srv://${username}:${password}@${clustername}.3ncbufp.mongodb.net/${dbname}?retryWrites=true&w=majority`;



const connectDB = async () => {
    try {

        await mongoose.connect(connectionString);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};


module.exports = connectDB;
