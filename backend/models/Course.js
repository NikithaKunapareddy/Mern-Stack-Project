const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  students: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    default: "General"
  },
  description: {
    type: String,
    default: "Learn and master key skills with hands-on practice and expert training."
  },
  rating: {
    type: Number,
    default: 4.5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);
