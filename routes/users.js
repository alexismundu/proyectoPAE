const express = require('express');
const {
    UsersController,
    BooksController,
    MoviesController
} = require('./../server/controllers');
const router = express.Router();
const multer = require('multer')


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const flag = file.mimetype.startsWith('image')
    cb(null, flag)
}
const uploadFile = multer({
    storage: multerStorage,
    fileFilter: fileFilter
})

/**
 * @swagger
 * /users/db:
 *  get:
 *      description: get all users in DB
 *      parameters: none
 *      responses:
 *          200:
 *              description: success call to the endpoint returns all users in DB
 *          500:
 *              description: error call to the endpoint 
 */
router.get('/db', UsersController.getAll);

/**
 * @swagger
 * /users/db:
 *  post:
 *      description: create a new user and save it in DB
 *      parameters: 
 *        - in: body
 *          name: email
 *          description: user email
 *          schema:
 *              type: string
 *        - in: body
 *          name: name
 *          description: user name
 *          schema:
 *              type: string
 *        - in: body
 *          name: last_name
 *          description: user last name
 *          schema:
 *              type: string
 *        - in: body
 *          name: age
 *          description: user's age
 *          schema:
 *              type: number
 *        - in: body
 *          name: password
 *          description: user password
 *          schema:
 *              type: string
 *        - in: body
 *          name: profileURL
 *          description: user porfile picture URL
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint returns user saved
 *          400:
 *              description: error call to the endpoint because this name or email is already registered
 *          500:
 *              description: error call to the endpoint 
 */
router.post('/db', uploadFile.single('img'), UsersController.create);

/**
 * @swagger
 * /users/db:
 *  put:
 *      description: update user in DB
 *      parameters: 
 *        - in: url
 *          name: email
 *          description: user email to update this specific user
 *          schema:
 *              type: string
 *        - in: body
 *          name: email
 *          description: user email
 *          schema:
 *              type: string
 *        - in: body
 *          name: name
 *          description: user name
 *          schema:
 *              type: string
 *        - in: body
 *          name: last_name
 *          description: user last name
 *          schema:
 *              type: string
 *        - in: body
 *          name: age
 *          description: user's age
 *          schema:
 *              type: number
 *        - in: body
 *          name: password
 *          description: user password
 *          schema:
 *              type: string
 *        - in: body
 *          name: profileURL
 *          description: user porfile picture URL
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint returns user saved
 *          400:
 *              description: error call to the endpoint because this name is already registered
 *          500:
 *              description: error call to the endpoint 
 */
router.put('/db/:email', UsersController.update);

/**
 * @swagger
 * /users/db:
 *  get:
 *      description: get a specific user in DB
 *      parameters: 
 *        - in: url
 *          name: email
 *          description: user email to find this specific user
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint returns user in DB
 *          500:
 *              description: error call to the endpoint 
 */
router.get('/db/:email', UsersController.getOne);

/**
 * @swagger
 * /users/db:
 *  delete:
 *      description: delete a specific user in DB
 *      parameters: 
 *        - in: url
 *          name: email
 *          description: user email to delete this specific user
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint returns user deleted
 *          500:
 *              description: error call to the endpoint 
 */
router.delete('/db/:email', UsersController.remove);

module.exports = router;