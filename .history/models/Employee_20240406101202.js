const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    required: true,
  },
  last_name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: function (value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    },
  },
  gender: {
    type: String,
    trim: true,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0.0) {
        throw new Error("Negative Salary aren't real.");
      }
    },
  },
  created: {
    type: Date,
    default: Date.now,
    alias: "createdate",
  },
  updatedate: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
