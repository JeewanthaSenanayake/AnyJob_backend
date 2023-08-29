const express = require('express');
const Model = require('../models/account');

const getWorkersRout = express.Router()

getWorkersRout.get(`/get_by_category/:category`, async (req, res) => {
    const category = req.params.category;

    await Model.find({ category : category })
        .exec()
        .then(async (data) => {
            let userData =[];
            
            for (const iterator of data) {
                let data = {
                    "name": iterator.fname + " " + iterator.lname,
                    "location": iterator.location,
                    "pImgUrl": iterator.pImgUrl,
                    "wokerId": iterator.id
                }

                userData.push(data);
            }
            console.log("userData found");
            res.status(200).json(userData)

        })
        .catch((err) => {
            // Handle error
            res.status(500).json({ error: 'Internal server error' });
        });
})

getWorkersRout.get(`/get_woker_by_id/:id`, async (req, res) => {
    const id = req.params.id;

    await Model.find({ id : id })
        .exec()
        .then(async (data) => {
            
            console.log("data found");
            res.status(200).json(data)

        })
        .catch((err) => {
            // Handle error
            res.status(500).json({ error: 'Internal server error' });
        });
})

module.exports = getWorkersRout;