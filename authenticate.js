const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/personSchema')

passport.use(new LocalStrategy(async (username ,password , done) => {
  try {
    // console.log("received credentials",username,password);
    const user =await  Person.findOne({username});
    if(!user){
      return done(null,false, {message : 'INCORRECT USERNAME'});
    }

    const isPasswortMatch =await user.comparePassword(password);
    if(isPasswortMatch){
      return done(null,user);
    }else{
      return done(null,false, {message : 'INCORRECT PASSWORD  '})
    }
  } catch (error) {
    return done(error)
  }
}))
module.exports = passport;