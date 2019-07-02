const mongoose = require('mongoose');

mongoose.connect('', { useNewUrlParser: true });

const Item = mongoose.model(
  'Item',
  mongoose.Schema({
    name: String,
    price: Number
  })
);

const AWPerhand = new Item({
  name: 'AWPer Hand',
  price: 5
});

AWPerhand.save((err, item) => {
  if (err) {
    console.log(err);
  } else {
    console.log(item);
  }
});