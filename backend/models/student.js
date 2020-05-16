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
        index: { unique: true },
        createIndexes: { unique: true },
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

function encryptPassword(user, next){
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, data) {
            if (err) return next(err);
            user.password = data;
            next();
        });
    });
}

function userPreHook(next) {
    const user = this;
    encryptPassword(user, next);
}

function updatePassword(next) {
    // update the password in encryption mode
    const user = this.getUpdate().$set;
    encryptPassword(user, next);
}

studentSchema.pre('save', userPreHook);
studentSchema.pre('updateOne', updatePassword);

studentSchema.static('checkPassword', function (password, hash, cb) {
    bcrypt.compare(password, hash, cb);
});

const student = mongoose.model('student', studentSchema);

module.exports = student;

