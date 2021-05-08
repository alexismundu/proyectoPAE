const Book = require('../models/book');
const fetch = require("node-fetch");

class BooksController {

    getAll(req, res) {
        console.log("get all books...");
        Book.find()
            .then(books => {
                res.statusCode = 200;
                res.send(books);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    }

    async create(req, res) {
        console.log("create...");

        let newBook = req.body;
        // No necesitamos validar si ya existe este libro
        //porque solo haremos POST si ya estamos seguros que este libro no existe en la BD
        //lo que habiamos dicho de usarlo como cache

        //save in DB
        let bookDocument = Book(newBook);
        bookDocument.save()
            .then(book => {
                res.statusCode = 200;
                res.send(book);
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log(reason);
                res.send("error");
            });

    }

    //no necesitamos un endpoint de update porque nunca vamos a cambiar los datos
    //de un libro, mas bien los guardamos tal cual vienen de la API de google

    //busca primero en BD y si no esta, lo busca en la API y lo guarda en la BD
    //example id : zyTCAlFPjgYC
    getOne(req, res) {
        console.log("get one book...");

        Book.findOne({
            id: req.params.id
        })
            .then(book => {
                if (book) {
                    console.log("book found in DB");
                    res.statusCode = 200;
                    res.send(book);
                } else {
                    console.log("book NOT found in DB");
                    const url = `https://www.googleapis.com/books/v1/volumes/${req.params.id}`;
                    fetch(url)
                        .then(response => response.text())
                        .then(bookResponse => {
                            var book = JSON.parse(bookResponse);
                            var bookModel = {
                                'id': book.id,
                                'publishedDate': book.volumeInfo.publishedDate,
                                'description': book.volumeInfo.description,
                                'title': book.volumeInfo.title,
                                'authors': book.volumeInfo.authors,
                                'pageCount': book.volumeInfo.pageCount,
                                'categories': book.volumeInfo.categories,
                                'previewLink': book.volumeInfo.previewLink,
                                'language': book.volumeInfo.language,
                                'averageRating': book.volumeInfo.averageRating,
                                'imageLink': book.volumeInfo.imageLinks.thumbnail
                            };
                            //save in DB
                            let bookDocument = Book(bookModel);
                            bookDocument.save()
                                .then(book => {
                                    console.log("successfully saved book in DB");
                                })
                                .catch(reason => {
                                    console.log("problem saving book in DB");
                                    console.log(reason);
                                });
                            res.statusCode = 200;
                            res.send(bookDocument);
                        }).catch(reason => {
                            res.statusCode = 500;
                            console.log(reason);
                            res.end('Failure fetching book from API')
                        });
                }
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log(reason);
                res.end('Failure fetching book from DB')
            });
    }

    remove(req, res) {
        console.log("deleting...");
        Book.deleteOne({
            id: req.params.id
        })
            .then(book => {
                res.statusCode = 200;
                res.send("book deleted");
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log(reason);
                res.end();
            });
    }

    getAllFromGoogleAPI(req, res) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=top`; //????????
        fetch(url)
            .then(response => response.text())
            .then(response => {
                var responseJson = JSON.parse(response);
                var books = responseJson.items;
                var bookModels = books.map((book) => {
                    return {
                        'id': book.id,
                        'publishedDate': book.volumeInfo.publishedDate,
                        'description': book.volumeInfo.description,
                        'title': book.volumeInfo.title,
                        'authors': book.volumeInfo.authors,
                        'pageCount': book.volumeInfo.pageCount,
                        'categories': book.volumeInfo.categories,
                        'previewLink': book.volumeInfo.previewLink,
                        'language': book.volumeInfo.language,
                        'averageRating': book.volumeInfo.averageRating,
                        'imageLink': book.volumeInfo.imageLinks.thumbnail
                    };
                })
                res.statusCode = 200;
                res.send(bookModels);
            }).catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end('Failure fetching books from API')
            });
    }

    getOneFromGoogleAPI(req, res) {
        let keyword = req.params.keyword;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}`;
        fetch(url)
            .then(response => response.text())
            .then(response => {
                var responseJson = JSON.parse(response);
                var books = responseJson.items;
                var bookModels = books.map((book) => {
                    return {
                        'id': book.id,
                        'publishedDate': book.volumeInfo.publishedDate,
                        'description': book.volumeInfo.description,
                        'title': book.volumeInfo.title,
                        'authors': book.volumeInfo.authors,
                        'pageCount': book.volumeInfo.pageCount,
                        'categories': book.volumeInfo.categories,
                        'previewLink': book.volumeInfo.previewLink,
                        'language': book.volumeInfo.language,
                        'averageRating': book.volumeInfo.averageRating,
                        'imageLink': book.volumeInfo.imageLinks.thumbnail
                    };
                })
                res.statusCode = 200;
                res.send(bookModels);
            }).catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end('Failure fetching books from API')
            });
    }
}


module.exports = new BooksController();