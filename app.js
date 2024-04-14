// env variables
require('dotenv').config();

// initialize express
const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();

// require handlebars
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

// use "main" as default layout
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      ifEquals: function (arg1, arg2, options) {
        return arg1 === arg2
          ? options.fn(this)
          : options.inverse(this);
      },
    },
  })
);

// use handlebars to render
app.set('view engine', 'handlebars');

// initialize body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// initialize methodOverride
app.use(methodOverride('_method'));

// initialize cookieParser
app.use(cookieParser());

// jwt
app.use(function authenticateToken(req, res, next) {
  // Gather the jwt access token from the cookie
  const token = req.cookies.mpJWT;

  if (token) {
    jwt.verify(token, 'AUTH-SECRET', (err, user) => {
      if (err) {
        console.log(err);
        // redirect to login if not logged in and trying to access a protected route
        res.redirect('/login');
      }
      req.user = user;
      next(); // pass the execution off to whatever request the client intended
    });
  } else {
    next();
  }
});

// current user
app.use((req, res, next) => {
  // if a valid JWT token is present
  if (req.user) {
    // Look up the user's record
    models.User.findByPk(req.user.id)
      .then((currentUser) => {
        // make the user object available in all controllers and templates
        res.locals.currentUser = currentUser;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    next();
  }
});

// import models
const models = require('./db/models');

// import controllers
require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);
require('./controllers/auth')(app, models);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
