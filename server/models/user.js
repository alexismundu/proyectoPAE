const mongoose = require('./database')

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    registered_date: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    profileURL: {
        type: String
    },
    booksToRead: {
        type: Array
    },
    favoriteBooks: {
        type: Array
    },
    friends: {
        type: Array
    },
});

let User = mongoose.model('users', userSchema);

module.exports = User;