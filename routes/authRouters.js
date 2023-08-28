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

authRouters.get('/login', async (req, res) => {

    let enteredPassword = req.body.password;
    let dataFound = true;
    await Model.find({ uname: req.body.uname })
        .exec()
        .then(async (data) => {
            // Return the matching data
            
            for (let i = 0; i < data.length; i++) {
                let isMatch = false;
                bcrypt.compare(enteredPassword, data[i].password, async (err, result) => {
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
                        res.json({
                            "id": data[i]._id,
                            "uname": data[i].uname,
                            "role": data[i].role
                        })
                        

                    } else {
                        // Passwords do not match
                        console.log('Passwords do not match');
                    }
                });
                if (isMatch) {
                    break;
                }
                
            }

        })
        .catch((err) => {
            // Handle error
            res.status(500).json({ error: 'Internal server error' });
        });
        
})

module.exports = authRouters;