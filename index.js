const express = require('express');
const routes = require('./routes');
const mongoose=require("mongoose")
require('dotenv').config();

const app = express();
app.use(express.json());

const username = process.env.DB_USERNAME;
const password = encodeURIComponent(process.env.DB_PASSWORD);
const clustername = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;

mongoose.connect(`mongodb+srv://${username}:${password}@${clustername}.3ncbufp.mongodb.net/${dbname}?retryWrites=true&w=majority`);

const db=mongoose.connection;
//error handling
db.on("error",console.error.bind(console, "connection failed"));

db.once("open",function(){
  console.log("connected to database successfully");
});


app.use('/', routes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});