const express = require('express');
const Model = require('../models/request');
const AccountModel = require('../models/account');

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

requestRout.post('/update_request', async (req, res) => {
    await Model.find({ woker_id: req.body.woker_id, requested: "1", cus_id: req.body.cus_id })
        .exec()
        .then(async (data) => {
                let val = data[0];
                val.requested = req.body.requested;
            try {
                const dataToSave = await val.save();
                res.status(200).json({ "id": dataToSave._id })
            }
            catch (error) {
                res.status(400).json({ message: error.message })
            }

        })
        .catch((err) => {
            // Handle error
            res.status(500).json({ error: 'Internal server error' });
        });
})



requestRout.get(`/admin_notification/:id`, async (req, res) => {
    const id = req.params.id;

    await Model.find({ woker_id: id, requested: "1" })
        .exec()
        .then(async (data) => {

            // console.log(data);

            let finalData = [];
            for (const iterator of data) {
                await AccountModel.find({ id: iterator.cus_id })
                    .exec()
                    .then(async (udata) => {

                        finalData.push(udata[0])
                    })
            }
            res.status(200).json(finalData)

        })
        .catch((err) => {
            // Handle error
            res.status(500).json({ error: 'Internal server error' });
        });
})

requestRout.get(`/cus_notification/:id`, async (req, res) => {
    const id = req.params.id;

    await Model.find({ cus_id: id })
        .exec()
        .then(async (data) => {

            // console.log(data);

            let finalData = [];
            for (const iterator of data) {
                await AccountModel.find({ id: iterator.woker_id })
                    .exec()
                    .then(async (udata) => {

                        finalData.push(udata[0])
                    })
            }
            res.status(200).json(finalData)

        })
        .catch((err) => {
            // Handle error
            res.status(500).json({ error: 'Internal server error' });
        });
})


module.exports = requestRout;