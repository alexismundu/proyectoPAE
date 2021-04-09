const express = require('express');
const { UsersController, BooksController, MoviesController } = require('./../server/controllers');
const router = express.Router();

/**
 * @swagger
 * /movies/db:
 *  get:
 *      description: get all movies in DB
 *      parameters: none
 *      responses:
 *          200:
 *              description: success call to the endpoint returns all movies in DB
 *          500:
 *              description: error call to the endpoint 
 */
router.get('/db', MoviesController.getAll);

/**
 * @swagger
 * /movies/db:
 *  post:
 *      description: create a new movie and save it in DB
 *      parameters: 
 *        - in: body
 *          name: id
 *          description: movie id
 *          schema:
 *              type: number
 *        - in: body
 *          name: title
 *          description: movie title
 *          schema:
 *              type: string
 *        - in: body
 *          name: original_language
 *          description: movie original language
 *          schema:
 *              type: string
 *        - in: body
 *          name: release_date
 *          description: movie's release date
 *          schema:
 *              type: string
 *        - in: body
 *          name: overview
 *          description: movie overview
 *          schema:
 *              type: string
 *        - in: body
 *          name: vote_average
 *          description: movie vote average
 *          schema:
 *              type: Number
 *      responses:
 *          200:
 *              description: success call to the endpoint returns movie saved
 *          500:
 *              description: error call to the endpoint 
 */
router.post('/db', MoviesController.create);

/**
 * @swagger
 * /movies/db:
 *  get:
 *      description: get a specific movie, search in DB first, if it is not found in DB, save it for future use (cache)
 *      parameters: 
 *        - in: url
 *          name: id
 *          description: movie id to get this specific movie
 *          schema:
 *              type: number
 *      responses:
 *          200:
 *              description: success call to the endpoint returns movie saved
 *          500:
 *              description: error call to the endpoint 
 */
router.get('/db/:id', MoviesController.getOne);

/**
 * @swagger
 * /movies/db:
 *  delete:
 *      description: delete a specific movie in DB
 *      parameters: 
 *        - in: url
 *          name: id
 *          description: movie id to delete this specific movie
 *          schema:
 *              type: number
 *      responses:
 *          200:
 *              description: success call to the endpoint returns movie deleted
 *          500:
 *              description: error call to the endpoint 
 */
router.delete('/db/:id', MoviesController.remove);

/**
 * @swagger
 * /movies/api:
 *  get:
 *      description: get top movies from movie API
 *      parameters: none
 *      responses:
 *          200:
 *              description: success call to the endpoint returns movies
 *          500:
 *              description: error call to the endpoint 
 */
router.get('/api', MoviesController.getAllFromMovieAPI);

/**
 * @swagger
 * /movies/api:
 *  get:
 *      description: search for movies with a specific keyword
 *      parameters: 
 *        - in: url
 *          name: keyword
 *          description: movie keyword to find movies
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint returns movies 
 *          500:
 *              description: error call to the endpoint 
 */
router.get('/api/:keyword', MoviesController.getOneFromMovieAPI);

module.exports = router;