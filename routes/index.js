const usersRoutes = require('./users');
const booksRoutes = require('./books');

const fs = require('fs');

module.exports = function (app) {
  app.use('/users', usersRoutes);
  app.use('/books', booksRoutes);

  app.get("/", (req, res) => {
    res.end('Hi from the backend');
});
}