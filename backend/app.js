//declaration
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');
const app = express();
const port = process.env.PORT;

//middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

//mongoose connection
mongoose.connect(`${process.env.MONGODB_URL}${process.env.DB_NAME}`, { useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Mongo DB connected');
    app.listen(port, () => console.log('server listening on port' + port));
});


//connection establish
module.exports = app;
