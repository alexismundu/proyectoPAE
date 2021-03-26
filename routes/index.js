const usersRoutes = require('./users');
const fs = require('fs');

module.exports = function (app) {
  app.use('/users', usersRoutes);

  app.get("/", (req, res) => {
    res.end('Hi from the backend');
});
}