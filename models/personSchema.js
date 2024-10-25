const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


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


personSchema.pre('save',async function(next){
  const person = this;
  if(!person.isModified('password')) return next();
  try {

    //adding salt
    const salt = await bcrypt.genSalt(10);

    //hashed passsword
    const hashPassword = await bcrypt.hash(person.password,salt)

    //OVERRIDE PLANE PASSWORD WITH HASHED PASSWORD
    person.password = hashPassword; 

    next();
  } catch (error) {
    return  next(error)
  }
})

personSchema.methods.comparePassword = async function(candidatePassword){
  try {
    //use bcrypt to compare the provided password with hashed password
    const isMatch =await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

const Person = mongoose.model('person',personSchema);
module.exports = Person;