require("dotenv").config();
const connectDB = require('./src/config/database.js');
const express = require('express');
const app = express();
const port = 5100;
const userRoutes = require("./src/routes/user.js");


connectDB();

app.use(express.json());
app.use("/api/v2/users", userRoutes);

app.listen(port, () => {
  console.log("Hello world");

});