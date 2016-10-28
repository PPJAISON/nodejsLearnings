var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser=require('body-parser');

mongoose.Promise = global.Promise;
//var db = mongoose.connect('mongodb://localhost/bookAPI');

var db = mongoose.connect('mongodb://dbuser1:dbuser1@ds031257.mlab.com:31257/mlab001');


var Book = require('./models/bookModel');
bookRouter = require('./routes/bookRoutes')(Book);

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

app.use('/api/books', bookRouter);

app.listen(port, function () {
    console.log('Running on PORT:' + port);
})