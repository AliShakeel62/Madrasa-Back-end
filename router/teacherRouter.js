const express = require('express');
const router = express.Router();
const { getDB } = require('../lib/db');
const Teacher = require('../schema/teacher.schema');


router.get("/", async (req, res) => {
  const data = await Teacher.find({})
  res.send(
    {
      message: "Teacher route is working fine",
      data: data
    }
  )
})

router.post("/", async (req, res) => {
  try {
    const data = { ...req.body };
    const teacher = new Teacher(data);
    await teacher.save();
    res.status(201).send({
      message: "data received",
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});
module.exports = router;
