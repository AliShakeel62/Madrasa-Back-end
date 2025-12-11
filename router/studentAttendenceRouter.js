const express = require('express');
const router = express.Router();
const { getDB } = require('../lib/db');
const StudentAttendence = require('../schema/studentAttendence.schema');


router.get("/", async (req, res) => {
  const data = await StudentAttendence.find({})
  res.send(
    {
      message: "students Attendence route is working fine",
      data: data
    }
  )
})

router.post("/", async (req, res) => {
  try {
    const data = { ...req.body };
    console.log("this is body " , req.body);
    const studentattendence = new StudentAttendence(data);
    await studentattendence.save();
    res.status(201).send({
      message: "data received",
      data: data
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: `Something went wrong` });
  }
});
module.exports = router;
