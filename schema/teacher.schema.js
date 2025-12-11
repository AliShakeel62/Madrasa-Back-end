const moongose = require('mongoose');
const teacherSchema = new moongose.Schema({
    name: {type:String , required:true },
    phone: Number,
    subject: String,
    joiningDate: {type:Date , default:Date.now},
    address: String,
    createdAt: { type: Date, default: Date.now }
})
const Teacher = moongose.model('Teachers', teacherSchema);
module.exports = Teacher;