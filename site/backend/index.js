const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('.hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Hey yo',
    message: 'Example of Handlebars usage'
  });
});

app.listen(3000);
