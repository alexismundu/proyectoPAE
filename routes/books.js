const express = require('express');
const { UsersController, BooksController } = require('./../server/controllers');

const router = express.Router();

router.get('/', BooksController.findAll);
router.get('/:keyword', BooksController.findAllByKeyword);

module.exports = router;