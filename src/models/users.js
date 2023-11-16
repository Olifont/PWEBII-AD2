const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    CPF: {
        type: String,
        required: true
    },
    dataNasc: {
        type: String,
        required: true
    },
    comida: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    userSchema,
};