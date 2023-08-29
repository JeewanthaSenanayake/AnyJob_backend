const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  
    cus_id:{
        required: true,
        type: String
    },
    woker_id:{
        required: true,
        type: String
    },
    requested:{
        required: true,
        type: Number  
        // 1 - requesded, 2-appve, 3-reject
    }
})

module.exports = mongoose.model('Request', dataSchema)