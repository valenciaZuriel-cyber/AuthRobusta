const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

// Rutas para la URL base: /api/v2/users
router.route("/")
    .post(userController.createUser)     // C - Crear
    .get(userController.getAllUsers);    // R - Leer todos

// Rutas que necesitan un parámetro ID: /api/v2/users/:id
router.route("/:id")
    .get(userController.getUserById)     // R - Leer uno por ID
    .put(userController.updateUser)      // U - Actualizar datos o desbloquear intentos
    .delete(userController.deleteUser);  // D - Eliminar

module.exports = router;