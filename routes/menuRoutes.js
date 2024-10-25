const express = require('express')
const router = express.Router();
const Menu = require('./../models/menuSchema')

router.post("/",async (req,res)=>{
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    const response = await newMenu.save();
    console.log("DATA SAVED");
    res.status(200).send(response)
  } catch (error) {
    console.log("DATA SAVED FAILED",error);
    res.status(500).send(error)
  }
})
router.get("/", async (req,res)=>{
  try {
    const menu =await Menu.find();
    res.status(200).send(menu)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/:taste", async (req,res)=>{
  try {
    const taste = req.params.taste;
    if(taste=='spicy' || taste == 'sweet' || taste=='savory' || taste=='bitter' || taste=='sour'){
      const response = await Menu.find({taste:taste})
      console.log("DATA FETCHED"); 
      res.status(200).json(response)
    }else{
      console.log("DATA FETCEHED FAILED");
      res.json(404).json({error: "INVALID TASTE TYPE"})
    }
  } catch (error) {
    res.json(500).json({error: "OOPS , FAILED TO FETCHED DATA"})
  }
})


//update routes
router.put("/:id",async (req,res)=>{
    try {
      const menuId = req.params.id;
      const updateMenuId = req.body;

      const response = await Menu.findByIdAndUpdate(menuId,updateMenuId,{
        new:true,
        runValidators : true
      })

      if(!response){
        return res.status(404).json({error: 'PERSON NOT FOUND'})
      }
      console.log("UPTAED SUCESSFULLY");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.json(500).json({error: "OOPS , FAILED TO FETCHED DATA"})
    }
})

//delete the operation
router.delete("/:id", async (req,res)=>{
  try {
    const personId = req.params.id;
    const operation = await Menu.findByIdAndDelete(personId);
    if(!operation){
      return res.status(404).json({error: 'ITEM NOT FOUND'})
    }
    console.log('SUCESSFULLY DELETED');
    res.status(200).json(operation)
  } catch (error) {
    console.log(error);
      res.json(500).json({error: "OOPS , FAILED TO DELETE DATA"})
  }
})

module.exports = router;