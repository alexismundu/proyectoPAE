const usersRoutes = require('./users');
const booksRoutes = require('./books');
const moviesRoutes = require('./movies');

const fs = require('fs');

module.exports = function (app) {
  app.use('/users', usersRoutes);
  app.use('/books', booksRoutes);
  app.use('/movies', moviesRoutes);
  app.get("/", (req, res) => {
    res.end('Hi from the backend');
});
}