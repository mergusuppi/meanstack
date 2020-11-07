const express = require('express');
const router = express.Router();
const studentRoute = require('./student');
const middlewares=require('../middlewares')

router.use('/student', studentRoute);

module.exports = router;    
