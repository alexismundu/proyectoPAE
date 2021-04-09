const express = require('express');
const { UsersController, BooksController, MoviesController } = require('./../server/controllers');

const router = express.Router();

router.get('/db', UsersController.getAll);
router.post('/db', UsersController.create);
router.put('/db/:email',  UsersController.update);
router.get('/db/:email', UsersController.getOne);
router.delete('/db/:email', UsersController.remove);

module.exports = router;