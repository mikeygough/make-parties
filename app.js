// initialize express
const express = require('express');
const methodOverride = require('method-override');
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
  })
);

// use handlebars to render
app.set('view engine', 'handlebars');

// initialize body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// initialize methodOverride
app.use(methodOverride('_method'));

// import models
const models = require('./db/models');

// import controllers
require('./controllers/events')(app, models);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
