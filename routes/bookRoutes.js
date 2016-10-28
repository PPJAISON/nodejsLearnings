var express = require('express');
var routes = function(Book){
var bookRouter = express.Router();
bookRouter.route('/')
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

bookRouter.use('/:bookId',function(req,res,next){
    Book.findById(req.params.bookId,function(err,book){
        if (err)
            res.status(500).send(err);
        else if(book)  {
            req.book=book;
            next();
        } else {
            res.status(404).send('no book found');
        }
    });
});

bookRouter.route('/:bookId')
    .get(function (req, res) {
        res.json(req.book);
    })
    .put(function(req,res){
        req.book.title=req.body.title;
        req.book.author=req.body.author;
        req.book.genre=req.body.genre;
        req.book.read=req.body.read;
        req.book.save(function(err){
        if (err)
            res.status(500).send(err);
        else res.json(req.book);

        });
  
    })
    .patch(function(req,res){
        if(req.body.title){req.book.title =req.body.title;}
        if(req.body.author){req.book.author =req.body.author;}
        if(req.body.genre){req.book.genre =req.body.genre;}
        if(req.body.read){req.book.genre =req.body.read;}
        req.book.save(function(err){
        if (err)
            res.status(500).send(err);
        else res.json(req.book);
        });
       
    })
    .delete(function (req, res) {
        req.book.remove(function(err){
        if (err)
            res.status(500).send(err);
        else{ 
            res.status(204).send('Removed');
        }
        });
    });

    return bookRouter;
};
module.exports = routes;


