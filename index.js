require("dotenv").config();
const connectDB = require('./src/config/database.js');
const express = require('express');
const helmet = require('helmet'); // Importar Helmet

const app = express();
const port = process.env.PORT || 5100;
const userRoutes = require("./src/routes/user.js");

// Activar las protecciones de Helmet al inicio
app.use(helmet());

connectDB();

app.use(express.json());
app.use("/api/v2/users", userRoutes);

app.listen(port, () => {
  console.log("Hello world");
});