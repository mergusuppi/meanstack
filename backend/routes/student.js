const emailCheck = require('email-check')
const express = require('express');
const router = express.Router();
const { Student } = require('../models');

router.post('/', (req, res) => {
    Student.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            res.status(500).json(err);
        }
        if (data) {
            res.json({ message: "The email address is already exist" });
        }
        else {
            Student.create(req.body).then((data) => {
                res.send(data);
            });
        }
    })
})


router.post('/login', (req, res) => {
    Student.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else if (data) {
            Student.checkPassword(req.body.password, data.password, (err, result) => {
                if (result) {
                    return res.json('login successfully');
                }
                if (err) {
                    return res.json('invalid password');
                }
            });
            // success
        } else {
            // user not found
            res.json('user not found')
        }
    });
})

router.get('/', (req, res) => {
    Student.find({}, (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(data)
        }
    });
})

router.put('/', (req, res) => {
    Student.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
            Student.updateOne({ _id: data._id }, { $set: { password: req.body.password } }, (err, data) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.json("password updated succesfully")
                }
            })
        } else {
            res.status(500).json(err ? err : "email not found");
        }
    })
})

module.exports = router;
