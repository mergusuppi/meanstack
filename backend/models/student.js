const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Collection schema
const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    contact: Number,
    email: {
        type: String,
        createIndexes: { unique: true },
        required: true
    },
    password: {
        type: String,
        createIndexes: { unique: true },
        required: true
    }
    });

    studentSchema.pre('save', function (next) {
        const user = this;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(student.password, salt, function (err, data) {
                if (err) return next(err);
                student.password = data;
                next();
            });
        });
    });
    studentSchema.static('checkPassword', function (password, hash, cb) {
        bcrypt.compare(password, hash, cb);
    });
    
const student = mongoose.model('student', studentSchema);

module.exports = student;

    