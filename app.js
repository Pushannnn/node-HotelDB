require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const connectDB = require('./db');
connectDB();
const passport = require('./authenticate')

const app = express();
//if not found port using this value 
const PORT = process.env.PORT || 3000;


// middleware
app.use(bodyParser.json()) //req.body
app.use(bodyParser.urlencoded({extended:true}))

const logRequest = (req,res,next) =>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();
}

app.use(logRequest)
//coneecting database

app.set("view engine","ejs");

app.use(passport.initialize());
const localAuthMidlleware = passport.authenticate('local',{session:false});

app.get("/",(req,res)=>{
  res.render('app');
});


//calling the person route
const personRoute = require('./routes/personRoutes')
//to use router
app.use("/person",localAuthMidlleware,personRoute);

//calling menu
const menuRouter = require('./routes/menuRoutes')
//using menuroute
app.use("/menu",localAuthMidlleware,menuRouter)

app.listen(PORT,()=>{
  console.log("SERVER IS RUNNING IN BACKGROUND...");
})
