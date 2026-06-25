const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    loginAttempts: {
        type: Number,
        required: true,
        default: 5 // Cuantos intentos va a tenr el usuario.
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("User", UserSchema);