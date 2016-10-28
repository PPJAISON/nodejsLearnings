var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser=require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

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