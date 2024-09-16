const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  CategoryName: String,
  name: String,
  img: String,
  options: [
    {
      half: String,
      full: String,
    }
  ],
  description: String,
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
