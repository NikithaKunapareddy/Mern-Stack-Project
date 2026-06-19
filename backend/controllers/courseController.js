const Course = require("../models/Course");

// GET ALL COURSES
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD COURSE
const addCourse = async (req, res) => {
  try {
    const { title, students, category, description, rating } = req.body;
    const course = await Course.create({
      title,
      students: Number(students) || 0,
      category: category || "General",
      description: description || "Learn and master key skills with hands-on practice and expert training.",
      rating: Number(rating) || 4.5
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COURSE
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ENROLL COURSE (INCREMENT STUDENTS COUNT)
const enrollCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.students += 1;
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  addCourse,
  deleteCourse,
  enrollCourse
};
