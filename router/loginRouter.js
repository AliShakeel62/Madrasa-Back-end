const express = require("express");
const router = express.Router();
const Users = require("../schema/user.schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(401).send({
                message: "Invalid credentials"
            });
        }

        // Agar user mila hai, ab password check karo.

        // Agar aap password hashing (jaise bcrypt) istimal kar rahe hain:
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid credentials" });
        }
        else {
            const usertoken = jwt.sign({ userId: user._id, email: user.email },JWT_SECRET, { expiresIn: '7d' });

            return res.status(200).json({
                message: "login successful",
                data: user,
                token: usertoken
            });

        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Something went wrong" });
    }
});
module.exports = router;