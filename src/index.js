const express = require('express');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoute');
const connectDB = require('./dbfiles/db');

const app = express();
app.use(express.json());

connectDB();

app.use('/login', loginRoutes);
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
