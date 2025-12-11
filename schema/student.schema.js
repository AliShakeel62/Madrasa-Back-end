const moongose = require('mongoose');
const studentSchema = new moongose.Schema({
    name: {type:String , required:true },
    age: Number,
    phone: Number,
    grade: String,
    fatherName: {type:String , required:true },
    addmissionDate: {type:Date , default:Date.now},
    address: String,
    dateofBirth: Date,
    CreatedAt: { type: Date, default: Date.now }
})
const Student = moongose.model('Students', studentSchema);
module.exports = Student;