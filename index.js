const express = require('express');
const app = express();
const { connectDB, getDB } = require('./lib/db');
const PORT = process.env.PORT;
require('dotenv').config();
const bodyParser = require("body-parser");
const studentRouter = require('./router/studentsRouter');
const teacherRouter = require('./router/teacherRouter');
const SignupRouter = require("./router/SignupRouter")
const LoginRouter = require("./router/loginRouter")
const studentAttendenceRouter = require("./router/studentAttendenceRouter")
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.use("/students",studentRouter);
app.use("/teachers",teacherRouter);
app.use("/signup",SignupRouter);
app.use("/login",LoginRouter);
app.use("/studentattendences",studentAttendenceRouter);





const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`app is running on , and ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server", error);
    }
};

startServer();