const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('', {
    useNewUrlParser: true,
});

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

app.use(require('./routes'));

app.listen(3000);
