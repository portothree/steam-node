const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('', { useNewUrlParser: true });

const Item = mongoose.model('Item', mongoose.Schema({
  name: String,
  price: Number
}))

app.engine('.hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
	Item.find({}, (err, items) => {
		if (err) {
			console.log(err);
		}

		res.render('home', { items });
	});
});

app.listen(3000);
