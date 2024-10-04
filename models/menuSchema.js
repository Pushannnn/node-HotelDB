const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // The name field is required
    trim: true      // Removes surrounding whitespace
  },
  price: {
    type: Number,
    required: true, // The price field is required
    min: 0          // Price must be a non-negative value
  },
  taste: {
    type: String,
    enum: ['spicy', 'sweet', 'savory', 'bitter', 'sour'],
    required: true, // The taste field is required
  }
})
const Menu = mongoose.model('menu',menuSchema);
module.exports = Menu;