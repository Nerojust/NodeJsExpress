const express = require("express");
const bookRouter = express.Router();
const setGeneralResponse = require('../utils/utils')
const jwt = require('jsonwebtoken');

function router(Book) {
  bookRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.send(err);
        res.json("No user found with id");
        return res.sendStatus(404);
      }
      if (book) {
        //set the result to be equal to the request to be passed to the next
        req.book = book;
        return next();
      }
      console.log("here2");
      return res.sendStatus(404);
    });
  });

  bookRouter
    .route("/books")
    //to get all records from the database
    .get((req, res) => {
      //empty query object
      const query = {};
      //if query from url exists
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      //find query
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        const result = setGeneralResponse(books);
        return res.json(result);
      });
    })
    //create a new book into database
    .post((req, res) => {
      //using book model, pair them using the model object
      const book = new Book(req.body);

      //save a record
      book.save(err => {
        if (err) {
          return res.send(err);
        }
        const result = setGeneralResponse(book);
        return res.json(result);
      });
    });
  bookRouter
    .route("/books/:bookId")
    //get a single record
    .get((req, res) => {
      const { book } = req;
      const result = setGeneralResponse(book);
      return res.json(result);
    })
    .put((req, res) => {
      const { book } = req;
      (book.title = req.body.title),
        (book.author = req.body.author),
        (book.adult = req.body.adult),
        (book.genre = req.body.genre);
      book.read = req.body.read;

      book.save();

      const result = setGeneralResponse(book);
      return res.json(result);
    })
    .patch((req, res) => {
      const { book } = req;
      if (req.body._id) {
        return delete req.body._id;
      }

      Object.entries(req.body).forEach(item => {
        const key = item[0];
        const value = item[1];
        book[key] = value;

        book.save(err => {
          if (err) {
            return res.send(err);
          }
          const result = setGeneralResponse(book);
          return res.json(result);
        });
      });
    })
    //delete endpoint
    .delete((req, res) => {
      req.book.remove(err => {
        if (err) {
          return res.send(err);
        }
        res.json("Deleted Successfully");
        return res.sendStatus(204);
      });
    });
  return bookRouter;
}
module.exports = router;

