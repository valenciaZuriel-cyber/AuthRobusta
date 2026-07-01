const User = require("../Modules/login.js"); 

// ==========================================
// Crear un usuario nuevo
// ==========================================
exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validación básica: verificar si el correo ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El correo electrónico ya está registrado." });
        }

        // Creamos la instancia del usuario. 
        // 'loginAttempts', 'lockUntil' y 'creationDate' se asignan solos por sus valores por defecto ('default')
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: { id: newUser._id, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
};

// ==========================================
// Obtener usuarios (Todos o uno solo)
// ==========================================
exports.getAllUsers = async (req, res) => {
    try {
        // Buscamos todos los usuarios, pero excluimos el password por seguridad usando '-password'
        const users = await User.find({}, "-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, "-password");
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
    }
};

// ==========================================
// Modificar datos de un usuario
// ==========================================
exports.updateUser = async (req, res) => {
    try {
        // Buscamos por ID y pasamos el objeto req.body completo para actualizar selectivamente.
        // '{ new: true, runValidators: true }' sirve para que nos devuelva el usuario ya editado
        // y para asegurar que valide los tipos de datos (como que 'loginAttempts' sea un número).
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        ).select("-password"); // No devolvemos la contraseña modificada

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario actualizado correctamente", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
};

// ==========================================
//Borrar un usuario de la BD
// ==========================================
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
    }
};