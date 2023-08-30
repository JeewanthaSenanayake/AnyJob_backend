const bcrypt = require('bcrypt');

const express = require('express');
const Model = require('../models/singUp');



const authRouters = express.Router()
authRouters.post('/sing_up', async (req, res) => {

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            // Handle error
            return;
        }

        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            if (err) {
                // Handle error
                return;
            }

            // Store the hash in your database
            //   console.log('Hashed Password:', hash);
            const data = new Model({
                uname: req.body.uname,
                password: hash,
                email: req.body.email,
                role: req.body.role
            })

            try {
                const dataToSave = await data.save();
                res.status(200).json({ "id": dataToSave._id })
            }
            catch (error) {
                res.status(400).json({ message: error.message })
            }

        });
    });

});

authRouters.post('/login', async (req, res) => {

    let enteredPassword = req.body.password;
    let dataFound = true;
    let finalData = {};
    await Model.find({ uname: req.body.uname })
        .exec()
        .then(async (data) => {
            // Return the matching data

            if (data.length == 0) {
                res.status(404).json({ error: 'Data not found' });
            } else {

                for (let i = 0; i < data.length; i++) {
                    console.log(i)
                    console.log(data.length - 1)
                    let isMatch = false;
                    bcrypt.compare(enteredPassword, data[i].password, (err, result) => {
                        if (err) {
                            // Handle error
                            return;
                        }

                        if (result) {
                            // Passwords match
                            console.log('Passwords match');
                            // console.log(data[i]);
                            dataFound = false;
                            isMatch = true;
                            finalData = {
                                "id": data[i]._id,
                                "uname": data[i].uname,
                                "role": data[i].role
                            }




                        } else {
                            // Passwords do not match
                            console.log('Passwords do not match');
                        }
                        if (i == data.length - 1) {
                            if (dataFound) {
                                console.log("Data not found")
                                res.status(404).json({ error: 'Data not found' });
                            } else {
                                res.status(200).json(finalData)
                            }

                        }
                    });


                }
            }
        })
        .catch((err) => {
            // Handle error
            res.status(500).json({ error: 'Internal server error' });
        });

})

module.exports = authRouters;