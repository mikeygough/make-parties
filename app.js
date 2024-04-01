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

// initialize body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// import models
const models = require('./db/models');

// routes

// OUR MOCK ARRAY OF PROJECTS
var events = [
  {
    title: 'I am your first event',
    desc: 'A great event that is super fun to look at and good',
    imgUrl:
      'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn',
  },
  {
    title: 'I am your second event',
    desc: 'A great event that is super fun to look at and good',
    imgUrl:
      'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn',
  },
  {
    title: 'I am your third event',
    desc: 'A great event that is super fun to look at and good',
    imgUrl:
      'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn',
  },
];

// INDEX
app.get('/', (req, res) => {
  models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(
    (events) => {
      res.render('events-index', { events: events });
    }
  );
});

// CREATE
app.get('/events/new', (req, res) => {
  res.render('events-new', {});
});

app.post('/events', (req, res) => {
  models.Event.create(req.body)
    .then((event) => {
      res.redirect(`/`);
    })
    .catch((err) => {
      console.log(err);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000');
});
