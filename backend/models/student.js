const mongoose = require('mongoose');
// Collection schema
const studentSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    contact:Number,
    email:String,
    password:String
});
const student = mongoose.model('student', studentSchema);

module.exports = student;