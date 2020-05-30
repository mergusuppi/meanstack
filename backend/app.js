//declaration
const express=require('express');
const mongoose=require('mongoose');
const logger=require('morgan');
const cors=require('cors');
const routes=require('./routes');
const app = express();
const port=3200;

//middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('public'))
app.use(express.urlencoded({extended:true}));

//mongoose connection
mongoose.connect('mongodb://localhost:27017/supriya', { useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Mongo DB connected');
});

app.use('/',routes);

//connection establish
app.listen(port, () => console.log('server listening on port' + port));
module.exports=app;
