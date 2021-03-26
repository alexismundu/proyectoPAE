const express = require('express');
const { UserController } = require('./../server/controllers');

const router = express.Router();

router.get('/', UserController.findAll);

module.exports = router;