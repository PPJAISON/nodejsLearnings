var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser=require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function(req,res){
        var book = new Book(req.body);
        book.save();
        console.log(book);
        res.send(book);

    })
    .get(function (req, res) {
        var query = req.query;
        Book.find(query,function(err,books){
            if (err){
                    console.log(err);
                    res.status(500).send(err);
                }
            else res.json(books);
        });
    });
app.use('/api', bookRouter);
/*app.get('/', function (req, res) {
    res.end('Welcome to my API');
});
app.get('/a', function (req, res) {
    res.send('Welcome to my API a');
});
*/
app.listen(port, function () {
    console.log('Running on PORT:' + port);
})