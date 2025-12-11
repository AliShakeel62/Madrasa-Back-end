const express = require('express');
const router = express.Router();
const { getDB } = require('../lib/db');
const Student = require('../schema/student.schema');


router.get("/", async (req, res) => {
  const data = await Student.find({})
  res.send(
    {
      message: "students route is working fine",
      data: data
    }
  )
})

router.post("/", async (req, res) => {
  try {
    const data = { ...req.body };
    const student = new Student(data);
    await student.save();
    res.status(201).send({
      message: "data received",
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});
router.get("/:id", async (req, res) => {
  try{
    const {id} = req.params;
    const student = await Student.findById(id);
res.status(200).send({
  message: "student fetched successfully",
})  }
  catch(error){}
})
module.exports = router;
