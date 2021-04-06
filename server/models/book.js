const mongoose = require('./database')

let bookSchema = mongoose.Schema({
    publishedDate: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
    },
    language: {
        type: String,
    },
    previewURL: {
        type: String,
    },
    pageCount: {
        type: Number,
    },
    rating: {
        type: Number
    }

});

let Book = mongoose.model('books', bookSchema);

module.exports = Book;