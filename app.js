// initialize express
const express = require('express');
const app = express();

// require handlebars
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

// use "main" as our default layout
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

// use handlebars to render
app.set('view engine', 'handlebars');

// routes
app.get('/', (req, res) => {
  res.render('home', { msg: 'Handlebars are Cool!' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000');
});
