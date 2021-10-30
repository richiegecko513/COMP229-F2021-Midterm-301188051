// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  books.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('books/details', {
    title: 'Add Book',
    books : " "
   });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = books({
    "title": req.body.title,
    "description": req.body.description,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre

});
books.create(newBook, (err, books)=>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
        //refresh book list
        res.redirect('/books');
    }
});
})

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {

  let id = req.params.id;

  books.findById(id, (err, bookToEdit)=>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else{
          //show the edit view
          res.render('books/details', {title: 'Edit Book', books: bookToEdit})
      }
  });
})

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

  let id = req.params.id;
   
  let updatedBook = books({
         "_id": id,
         "title": req.body.title,
         "description": req.body.description,
         "price": req.body.price,
         "author": req.body.author,
         "genre": req.body.genre
 
  });
 
  books.updateOne({_id: id}, updatedBook, (err)=>{
         if(err)
         {
             console.log(err);
             red.end.err;
         }
         else
         {
             //refresh book list
             res.redirect('/books');
         }
  });
})

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  books.remove({_id: id}, (err)=>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //refresh book list
          res.redirect('/books');
      }
  });
})


module.exports = router;
