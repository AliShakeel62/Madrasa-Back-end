const express = require('express');
const router = express.Router();
const Users = require('../schema/user.schema');
const bcrypt = require('bcrypt'); 
const saltRounds = 10;

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
    
    
    const plainPassword = data.password;

  
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    data.password = hashedPassword;

    const User = new Users(data);
    await User.save();
    
    const responseData = { ...data };
    delete responseData.password; 

    res.status(201).send({
      message: "User successfully registered",
      data: responseData 
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;