const express = require('express');
const { UsersController, BooksController } = require('./../server/controllers');

const router = express.Router();

router.get('/', UsersController.getAll);
router.post('/', UsersController.create);
router.put('/:email',  UsersController.update);
router.get('/:email', UsersController.getOne);
router.delete('/:email', UsersController.remove);

module.exports = router;