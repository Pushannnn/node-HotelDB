const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // The name field is required
    trim: true      // Removes surrounding whitespace
  },
  age: {
    type: Number,
    required: true, // The age field is required
  },
  work: {
    type: String,
    enum: ['computerengineer', 'datascience', 'devops'], // Limits work field to specific values
    required: true
  },
  username : {
    required: true,
    type : String
  },
  password : {
    required : true,
    type : String
  }
})

const Person = mongoose.model('person',personSchema);
module.exports = Person;