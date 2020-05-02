const express = require('express');
const router = express.Router();
const studentRoute = require('./student');

router.use('/student', studentRoute);

module.exports = router;    
