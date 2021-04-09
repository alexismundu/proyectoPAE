const express = require('express');
const { UsersController, BooksController, MoviesController } = require('./../server/controllers');

const router = express.Router();

//database
router.get('/db', MoviesController.getAll);
router.post('/db', MoviesController.create);
router.get('/db/:id', MoviesController.getOne);
router.delete('/db/:id', MoviesController.remove);
//api
router.get('/api', MoviesController.getAllFromMovieAPI);
router.get('/api/:keyword', MoviesController.getOneFromMovieAPI);

module.exports = router;