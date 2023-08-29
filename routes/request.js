const express = require('express');
const Model = require('../models/request');

const requestRout = express.Router()

requestRout.post('/make_request', async (req, res) => {
    const data = new Model({
        cus_id: req.body.cus_id,
        woker_id: req.body.woker_id,
        requested: req.body.requested
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json({ "id": dataToSave._id })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})


module.exports = requestRout;