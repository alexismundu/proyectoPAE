const express = require('express');
const { UsersController, BooksController, MoviesController } = require('./../server/controllers');
const router = express.Router();

/**
* @swagger
* /books/db:
*  get:
*      description: get all books in DB
*      parameters: none
*      responses:
*          200:
*              description: success call to the endpoint returns all books in DB
*          500:
*              description: error call to the endpoint 
*/
router.get('/db', BooksController.getAll);

/**
 * @swagger
 * /books/db:
 *  post:
 *      description: create a new book and save it in DB
 *      parameters: 
 *        - in: body
 *          name: id
 *          description: book id
 *          schema:
 *              type: string
 *        - in: body
 *          name: title
 *          description: book title
 *          schema:
 *              type: string
 *        - in: body
 *          name: language
 *          description: book language
 *          schema:
 *              type: string
 *        - in: body
 *          name: publishedDate
 *          description: book's published date
 *          schema:
 *              type: string
 *        - in: body
 *          name: authors
 *          description: book's authors
 *          schema:
 *              type: array
 *        - in: body
 *          name: categories
 *          description: book's categories
 *          schema:
 *              type: array
 *        - in: body
 *          name: pageCount
 *          description: book's pageCount
 *          schema:
 *              type: number
 *        - in: body
 *          name: description
 *          description: book description
 *          schema:
 *              type: string
 *        - in: body
 *          name: averageRating
 *          description: average rating
 *          schema:
 *              type: number
 *        - in: body
 *          name: imageLink
 *          description: book cover image link 
 *          schema:
 *              type: string
 *        - in: body
 *          name: previewLink
 *          description: ebook preview link
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint returns book saved
 *          500:
 *              description: error call to the endpoint 
 */
router.post('/db', BooksController.create);

/**
 * @swagger
 * /books/db:
 *  get:
 *      description: get a specific book, search in DB first, if it is not found in DB, save it for future use (cache)
 *      parameters: 
 *        - in: url
 *          name: id
 *          description: book id to find this specific book
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint returns book found
 *          500:
 *              description: error call to the endpoint 
 */
router.get('/db/:id', BooksController.getOne);

/**
 * @swagger
 * /books/db:
 *  delete:
 *      description: delete a specific movie in DB
 *      parameters: 
 *        - in: url
 *          name: id
 *          description: book id to find this specific book
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint returns book found
 *          500:
 *              description: error call to the endpoint 
 */
router.delete('/db/:id', BooksController.remove);

/**
 * @swagger
 * /books/api:
 *  get:
 *      description: get top books from Google API
 *      parameters: none
 *      responses:
 *          200:
 *              description: success call to the endpoint returns books
 *          500:
 *              description: error call to the endpoint 
 */
router.get('/api', BooksController.getAllFromGoogleAPI);

/**
 * @swagger
 * /books/api:
 *  get:
 *      description: search for books with a specific keyword from Google API
 *      parameters: 
 *        - in: url
 *          name: keyword
 *          description: movie keyword to find books
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint returns books 
 *          500:
 *              description: error call to the endpoint 
 */
router.get('/api/:keyword', BooksController.getOneFromGoogleAPI);

module.exports = router;