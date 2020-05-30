const express = require('express');
const router = express.Router();
const studentRoute = require('./student');
const middlewares=require('../middlewares')

router.use('/student',middlewares.checkHeaderValues, studentRoute);

module.exports = router;    
