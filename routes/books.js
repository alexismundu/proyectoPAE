const express = require('express');
const { UsersController, BooksController, MoviesController } = require('./../server/controllers');

const router = express.Router();

//database
router.get('/db', BooksController.getAll);
router.post('/db', BooksController.create);
router.get('/db/:id', BooksController.getOne);
router.delete('/db/:id', BooksController.remove);
//api
router.get('/api', BooksController.getAllFromGoogleAPI);
router.get('/api/:keyword', BooksController.getOneFromGoogleAPI);

module.exports = router;