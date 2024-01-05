const express = require('express');
const userRoutes = require('./src/routes/userController');
const mongoose=require("mongoose");
require('dotenv').config();
const connectDB = require('./src/dbfiles/db'); // Import the database connection function

const app = express();
app.use(express.json());

connectDB();

app.use('/', userRoutes);


app.listen(3000, () => {
  console.log('Server started on port 3000');
});