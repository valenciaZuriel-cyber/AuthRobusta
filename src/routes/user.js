const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const verificarTokenGenerico = require('../middleware/authMiddleware');

// Rutas para la URL base: /api/v2/users
router.route("/")
    .post(verificarTokenGenerico, userController.createUser)     
    .get(verificarTokenGenerico, userController.getAllUsers);    

// Rutas que necesitan un parámetro ID: /api/v2/users/:id
router.route("/:id")
    .get(verificarTokenGenerico, userController.getUserById)     
    .put(verificarTokenGenerico, userController.updateUser)      
    .delete(verificarTokenGenerico, userController.deleteUser);  

module.exports = router;