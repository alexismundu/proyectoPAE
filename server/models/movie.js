const mongoose = require('./database')

let movieSchema = mongoose.Schema({
    id: {
        type: Number,
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
    }
});

let Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;