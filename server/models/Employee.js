const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, 'Please provide an Employee ID'],
    unique: true,
  },
  employeeName: {
    type: String,
    required: [true, 'Please provide an Employee Name'],
  },
  employeeSalary: {
    type: Number,
    required: [true, 'Please provide an Employee Salary'],
  },
}, {
  timestamps: true 
});
module.exports = mongoose.model('Employee', EmployeeSchema);