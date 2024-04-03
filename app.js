// env variables
require('dotenv').config();

// initialize express
import express from 'express';
import methodOverride from 'method-override';
const app = express();

// require handlebars
import { engine } from 'express-handlebars';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

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
import { urlencoded } from 'body-parser';
app.use(urlencoded({ extended: true }));

// initialize methodOverride
app.use(methodOverride('_method'));

// import models
import models from './db/models';

// import controllers
require('./controllers/events')(app, models);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
