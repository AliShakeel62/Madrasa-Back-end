const moongose = require('mongoose');
const studentSchema = new moongose.Schema({
    name: {type:String , required:true },
    age: Number,
    phone: Number,
    grade: String,
    fatherName: {type:String , required:true },
    addmissionDate: {type:Date , default:Date.now},
    address: String,
<<<<<<< HEAD
    dateofBirth: Date,
    CreatedAt: { type: Date, default: Date.now }
=======
    dateofBirth: Date
>>>>>>> f2865aabf4467d273f2b204b193ba1fb2fa90de8
})
const Student = moongose.model('Students', studentSchema);
module.exports = Student;