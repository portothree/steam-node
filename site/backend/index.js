const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const hbs = handlebars.create();

app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('main', {
        title: 'Hey yo',
        message: 'Example of Handlebars usage'
    })
});

app.listen(3333);