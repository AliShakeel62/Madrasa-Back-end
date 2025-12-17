const express = require('express');
const router = express.Router();
const Users = require('../schema/user.schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


router.get("/", async (req, res) => {
  const data = await Users.find({});
  res.send(
    {
      message: "User route is working fine",
      data: data
    }
  )
})

router.post("/", async (req, res) => {
  try {
    const data = { ...req.body };

console.log("Signup Data:", data);
    const plainPassword = data.password;


    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    data.password = hashedPassword;

    const User = new Users(data);
    const savedata = await User.save();
    const usertoken = jwt.sign({ userId: savedata._id, email: savedata.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const responseData = {
      _id: savedata._id,
      name: savedata.name,
      email: savedata.email,
      token: usertoken
    };

    res.status(201).send({
      message: "User successfully registered",
      data: responseData
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send({ error: "Something went wrong" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await Users.findByIdAndDelete(userId);
    res.status(200).send({
      message: "User successfully deleted"
    });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;