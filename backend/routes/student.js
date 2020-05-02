const express = require('express');
const router = express.Router();
const { Student } = require('../models');

router.post('/', (req, res) => {
    try {
        Student.create(req.body, (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(data);
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else if (data) {
            User.checkPassword(req.body.password, data.password, (err, result) => {
                if (result) return res.json('login successfully');
                if (err) return res.status(500).json(err);
                return res.json('invalid password');
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

module.exports = router;
