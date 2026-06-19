const express = require("express");
const router = express.Router();
const { 
  getCourses, 
  addCourse, 
  deleteCourse, 
  enrollCourse 
} = require("../controllers/courseController");

router.get("/", getCourses);
router.post("/", addCourse);
router.delete("/:id", deleteCourse);
router.put("/:id/enroll", enrollCourse);

module.exports = router;
