const express = require('express');
const passport = require('passport');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const dataRoutes = require('./routes/dataRoutes');
const connectDB = require('./dbfiles/db');
const googleLogin = require('./login/googleLogin');

const app = express();
app.use(express.json());

const publicPath = path.join(__dirname, 'public');
console.log(publicPath);
app.use(express.static(publicPath));

// Initialize Passport and configure with Google OAuth
googleLogin(passport);
app.use(passport.initialize());

// Database connection
connectDB();

// API Routes
app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/data', dataRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
