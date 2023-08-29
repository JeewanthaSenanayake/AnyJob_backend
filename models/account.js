const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    
    
    
    
    
    
    
    
    id: {
        required: true,
        type: String
    },
    fname: {
        required: true,
        type: String
    },
    lname: {
        required: true,
        type:String
    },
    address: {
        required: true,
        type: String
    },
    contact: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    birth: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: String
    },
    category: {
        required: false,
        type: String
    },
    descrip: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    },
    pImgUrl: {
        required: false,
        type: String
    },
    workImgUrl: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('accounts', dataSchema)