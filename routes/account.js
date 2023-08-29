const bcrypt = require('bcrypt');

const express = require('express');
const Model = require('../models/account');



const accountRouters = express.Router()
accountRouters.post('/create_account', async (req, res) => {

    const data = new Model({
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        contact: req.body.contact,
        email: req.body.email,
        birth: req.body.birth,
        gender: req.body.gender,
        location: req.body.location,
        category: req.body.category,
        id: req.body.id,
        role: req.body.role,
        pImgUrl: req.body.pImgUrl,
        workImgUrl: req.body.workImgUrl,
        descrip: req.body.descrip
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json({"masage":"sucessfull" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

});

module.exports = accountRouters;