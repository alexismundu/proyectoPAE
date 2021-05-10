const mongoose = require('./database')

let movieSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
    },
    overview: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    original_language: {
        type: String,
    },
    thumbnailURL: {
        type: String,
    },
    vote_average: {
        type: Number
    },
    vote_count: {
        type: Number
    },
    popularity: {
        type: Number
    }
});

let Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;