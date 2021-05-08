const Movie = require('../models/movie');
const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();
const key = process.env.MOVIEAPIKEY || "";
const baseThumbnailURL = 'https://image.tmdb.org/t/p/original';
class MoviesController {

    getAll(req, res) {
        console.log("get all movies...");
        Movie.find()
            .then(movies => {
                res.statusCode = 200;
                res.send(movies);
                res.end();
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    }

    async create(req, res) {
        console.log("creating movie...");

        let newMovie = req.body;
        // No necesitamos validar si ya existe este movie
        //porque solo haremos POST si ya estamos seguros que este movie no existe en la BD
        //lo que habiamos dicho de usarlo como cache

        //save in DB
        let movieDocument = Movie(newMovie);
        movieDocument.save()
            .then(movie => {
                res.statusCode = 200;
                res.send(movie);
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log(reason);
                res.send("error");
            });

    }

    //no necesitamos un endpoint de update porque nunca vamos a cambiar los datos
    //de un libro, mas bien los guardamos tal cual vienen de la API de Movie

    //busca primero en BD y si no esta, lo busca en la API y lo guarda en la BD
    //example id : zyTCAlFPjgYC
    getOne(req, res) {
        console.log("get one movie...");

        Movie.findOne({
            id: req.params.id
        })
            .then(movie => {
                if (movie) {
                    console.log("movie found in DB");
                    res.statusCode = 200;
                    res.send(movie);
                } else {
                    console.log("movie NOT found in DB");
                    const url = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${key}&language=en-US`;
                    fetch(url)
                        .then(response => response.text())
                        .then(movieResponse => {
                            var movie = JSON.parse(movieResponse);
                            var movieModel = {
                                'id': movie.id,
                                'release_date': movie.release_date,
                                'overview': movie.overview,
                                'title': movie.title,
                                'original_language': movie.original_language,
                                'thumbnailURL': `${baseThumbnailURL}${movie.poster_path}`,
                                'popularity': movie.popularity,
                                'vote_average': movie.vote_average,
                                'vote_count': movie.vote_count
                            };
                            //save in DB
                            let movieDocument = Movie(movieModel);
                            movieDocument.save()
                                .then(movie => {
                                    console.log("successfully saved movie in DB");
                                })
                                .catch(reason => {
                                    console.log("problem saving movie in DB");
                                    console.log(reason);
                                });
                            res.statusCode = 200;
                            res.send(movieDocument);
                        }).catch(reason => {
                            res.statusCode = 500;
                            console.log(reason);
                            res.end('Failure fetching movie from API')
                        });
                }
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log(reason);
                res.end('Failure fetching movie from DB')
            });
    }

    remove(req, res) {
        console.log("deleting movie...");
        Movie.deleteOne({
            id: req.params.id
        })
            .then(movie => {
                res.statusCode = 200;
                res.send("movie deleted");
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log(reason);
                res.end();
            });
    }

    getAllFromMovieAPI(req, res) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=top`;
        fetch(url)
            .then(response => response.text())
            .then(response => {
                var responseJson = JSON.parse(response);
                var movies = responseJson.results;
                if (movies === undefined) {
                    throw Error('Movies undefined');
                }
                movies.length > 10
                var movieModels = movies.map((movie) => {
                    return {
                        'id': movie.id,
                        'release_date': movie.release_date,
                        'overview': movie.overview,
                        'title': movie.title,
                        'original_language': movie.original_language,
                        'thumbnailURL': `${baseThumbnailURL}${movie.poster_path}`,
                        'popularity': movie.popularity,
                        'vote_average': movie.vote_average,
                        'vote_count': movie.vote_count
                    };
                })
                res.statusCode = 200;
                res.send(movieModels);
            }).catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end('Failure fetching movies from API')
            });
    }

    getOneFromMovieAPI(req, res) {
        let keyword = req.params.keyword;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${keyword}`;
        fetch(url)
            .then(response => response.text())
            .then(response => {
                var responseJson = JSON.parse(response);
                var movies = responseJson.results;
                var movieModels = movies.map((movie) => {
                    return {
                        'id': movie.id,
                        'release_date': movie.release_date,
                        'overview': movie.overview,
                        'title': movie.title,
                        'original_language': movie.original_language,
                        'thumbnailURL': `${baseThumbnailURL}${movie.poster_path}`,
                        'popularity': movie.popularity,
                        'vote_average': movie.vote_average,
                        'vote_count': movie.vote_count
                    };
                })
                res.statusCode = 200;
                res.send(movieModels);
            }).catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end('Failure fetching movies from API')
            });
    }
}


module.exports = new MoviesController();