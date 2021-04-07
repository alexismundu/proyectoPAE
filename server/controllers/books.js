const Book = require('../models/book');
const fetch = require("node-fetch");

class BooksController {
    findAll(req, res) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=top`; //????????
        fetch(url)
            .then(response => response.text())
            .then(booksResponse => {
                var books = JSON.parse(booksResponse);
                res.statusCode = 200;
                res.send(books.items);
            }).catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end('Failure fetching books')
            });
    }

    findAllByKeyword(req, res) {
        let keyword = req.params.keyword;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}`;
        fetch(url).then(response => response.text())
            .then(booksResponse => {
                var books = JSON.parse(booksResponse);
                res.statusCode = 200;
                res.send(books.items);
            }).catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end('Failure fetching books')
            });
    }

}


module.exports = new BooksController();