const express = require("express");
const router = express.Router();

const Person = require("./../models/personSchema");

router.post("/", async (req, res) => {
  try {
    const data = req.body; //js object ko data lai data ma store gaayam
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Sucessfully Responed");
    res.status(201).send(response);
  } catch (error) {
    console.log("Enter failed", error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const person = await Person.find();
    res.status(200).send(person);
  } catch (error) {
    res.status(500).send(error);
  }
});
//to get data by dynamic url
router.get("/:work", async (req, res) => {
  try {
    const work = req.params.work;
    if (
      work == "computerengineer" ||
      work == "datascience" ||
      work == "devops"
    ) {
      const responseWork = await Person.find({ work: work });
      console.log("response fetched");
      res.status(200).json(responseWork);
    } else {
      res.status(400).json({ error: "INVALID WORK TYPE" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
});

///to update
router.put("/:id",async (req,res)=>{
  try {
    const personId = req.params.id;  //extract the id
    const updatePersonData = req.body; //update data from person

    const resopnse = await Person.findByIdAndUpdate(personId,updatePersonData,{
      new:true,    //return updated document
      runValidators : true
    })
    if(!resopnse){
      return res.send(404).json({error: 'PERSON NOT FOUND'})
    }
    console.log("UPDATED SUCESSFULLY");
    res.status(200).json(resopnse)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
})
//to delete
router.delete("/:id", async (req,res)=>{
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId)

    if(!response){
      // return res.status(404).json({error : 'person not found'})
      return res.status(404).json(response)
    }
    console.log("data deleted");
    res.status(200).send(200).json({message : 'Data deleted'});
  }catch(error){
    console.log(error);
    res.status(500).json({error : 'INTERNAL SERVER ERROR'})
  }
})
module.exports = router;
