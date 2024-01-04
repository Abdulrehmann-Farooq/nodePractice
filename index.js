const express = require('express');
const createRoutes = require('./routes/create');
const readRoutes = require('./routes/read');
const updateRoutes = require('./routes/update');
const deleteRoutes = require('./routes/delete');
const mongoose=require("mongoose");
require('dotenv').config();
const connectDB = require('./dbfiles/db'); // Import the database connection function

const app = express();
app.use(express.json());

connectDB();

app.use('/create', createRoutes);
app.use('/read', readRoutes);
app.use('/update', updateRoutes);
app.use('/delete', deleteRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});