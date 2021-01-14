const express = require('express');
const router = express.Router();
const { Student } = require('../models');
const { generateToken, fileMove, fileRename, emailNotification } = require('../utils');
const { verifyAuthentication, upload } = require('../middlewares')

function success(res, data) {
    res.json(data);
}

function serverError(res, err) {
    res.status(500).json(err);
}

function badResponse(res, data) {
    res.status(400).json(data);

}
router.post('/profile', upload.single('avatar'), async function (req, res, next) {
    const file = req.file;
    const body = req.body;
    const src = file.path;
    const fileName = fileRename(file);
    const dst = `uploads/${body.id}`;
    const isDone = await fileMove(src, dst, fileName);
    if (isDone) {
        const filePath = `${dst}/${fileName}`;
        res.json({ ...body, filePath });
    }
    else {
        res.status(500).json({ message: 'uploading failed' })
    }
})

router.post('/', (req, res) => {
    Student.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            serverError(res, err);
        } else if (data) {
            badResponse(res, { message: "The email address is already exist" });
        } else {
            Student.create(req.body).then((data) => {
                success(res, data);
            });
        }
    })
})


router.post('/login', (req, res) => {
    try {
        Student.findOne({ email: req.body.email }, (err, data) => {
            if (err) {
                // res.status(500).json(err);
                serverError(res, err);
            } else if (data) {
                Student.checkPassword(req.body.password, data.password, (err, result) => {
                    if (result) {
                        const { email, _id } = data;
                        const token = generateToken({ email, _id });
                        return success(res, { message: 'login successfully', token });
                    }
                    if (err) {
                        return badResponse(res, { message: 'invalid password' });
                    }
                });
            } else {
                // user not found
                badResponse(res, { message: 'user not found' });
            }
        });
    } catch (error) {
        badResponse(res, error);
    }
})

router.get('/', (req, res) => {
    Student.find({}, (err, data) => {
        if (err) {
            // res.status(500).json(err);
            serverError(res, err);
        } else {
            emailNotification();
            success(res, data)
        }
    });
})

router.put('/', (req, res) => {
    Student.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
            Student.updateOne({ _id: data._id }, { $set: { password: req.body.password } }, (err, data) => {
                if (err) {
                    serverError(res, err)
                    success(res, { message: 'password updated succesfully' });
                }
            })
        } else {
            serverError(res, err ? err : { message: 'email not found' });
        }
    })
})

module.exports = router;
