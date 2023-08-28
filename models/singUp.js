const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    uname: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type:String
    },
    email: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Singup', dataSchema)