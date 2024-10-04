const express = require('express')
const app = express();
const bodyParser = require('body-parser');
// const port = 3000;
const connectDB = require('./db');
require('dotenv').config();


//using dotenv
// const PORT = process.env.PORT;

//if not found port using this value
const PORT = process.env.PORT || 3000;

//coneecting database
connectDB();

app.use(bodyParser.json()) //req.body

app.set("view engine","ejs");

app.get("/",(req,res)=>{
  res.render('app');
});


//calling the person route
const personRoute = require('./routes/personRoutes')
//to use router
app.use("/person",personRoute);

//calling menu
const menuRouter = require('./routes/menuRoutes')
//using menuroute
app.use("/menu",menuRouter)

app.listen(PORT,()=>{
  console.log("SERVER IS RUNNING IN BACKGROUND...");
})
