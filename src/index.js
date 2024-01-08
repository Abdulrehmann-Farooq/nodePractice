const express = require('express');
const userRoutes = require('./routes/userController');
const connectDB = require('./dbfiles/db'); // Import the database connection function

const app = express();
app.use(express.json());

connectDB();

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
