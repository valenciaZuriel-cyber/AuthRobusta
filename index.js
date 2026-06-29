require("dotenv").config();
const connectDB = require('./src/config/database.js');
const express = require('express');
const app = express();
const port = 5100;

connectDB();

app.listen(port, () => {
  console.log("Hello world");

});