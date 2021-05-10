const mongoose = require('./database')

let bookSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    publishedDate: {
        type: String,
    },
    description: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    authors: {
        type: Array
    },
    categories: {
        type: Array,
    },
    language: {
        type: String,
    },
    previewLink: {
        type: String,
    },
    imageLink: {
        type: String,
    },
    pageCount: {
        type: Number,
    },
    averageRating: {
        type: Number
    }

});

let Book = mongoose.model('books', bookSchema);

module.exports = Book;