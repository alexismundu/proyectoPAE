const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const routes = require("./routes");
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
var cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require("swagger-jsdoc");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./server/models/user');
const {Server} = require('socket.io');
const http = require('http');


const app = express();

const server = http.createServer(app);

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      "title": "GoodStuff API Documentation",
      "description": "API to handle users, books and movies",
      "version": "1.0.0",
      "servers": ["http://localhost:3000"],
      "contact": {
        "name": "Carolina"
      }
    }
  },
  apis: ['index.js', 'routes/users.js', 'routes/books.js', 'routes/movies.js']
}

routes(app);

//swagger
const swaggerDoc = swaggerJSDoc(swaggerOptions);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));




/*  PASSPORT SETUP  */

var userProfile;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    User.findOne({ id: profile.id }).then((currentUser) => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        new User({
          id: profile.id,
          name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
          registered_date: new Date(),
          age: 0
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }
    })
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    req.session.userId = req.user.id;
    console.log(req.headers)
    res.redirect(process.env.CLIENT_URL);
  });

const io = new Server(server, {
  cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => { 
  console.log('[*] A client got connected to socket server!');
  socket.on('message', (msg) => {
    console.log(`[+] Client ${socket.id} sent: ${msg}`);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`[*] Sucessfully listening on port ${process.env.PORT}`);
});
