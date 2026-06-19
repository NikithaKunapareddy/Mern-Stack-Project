import { useState } from "react";
import API from "../api/courseApi";
import { toast } from "react-toastify";
import { FaFolderPlus } from "react-icons/fa";

function AddCourse() {
  const [course, setCourse] = useState({
    title: "",
    students: "",
    category: "Frontend",
    description: "",
    rating: "4.5"
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!course.title || !course.students) {
      toast.error("Title and Initial Students are required");
      return;
    }

    try {
      await API.post("/courses", {
        ...course,
        students: Number(course.students),
        rating: Number(course.rating)
      });
      toast.success("Course added successfully!");
      setCourse({
        title: "",
        students: "",
        category: "Frontend",
        description: "",
        rating: "4.5"
      });
    } catch (error) {
      toast.error("Failed to add course.");
    }
  }

  return (
    <div className="page-container" style={{ maxWidth: "600px" }}>
      <h1>
        <FaFolderPlus style={{ marginRight: "12px", verticalAlign: "middle" }} />
        Add Course
      </h1>
      <h3 style={{ marginBottom: "25px" }}>Register a new modern technology course into the SkillHub catalog database.</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="course-title">Course Title</label>
          <input
            id="course-title"
            type="text"
            placeholder="e.g. Master React and Redux"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course-category">Category</label>
          <select
            id="course-category"
            value={course.category}
            onChange={(e) => setCourse({ ...course, category: e.target.value })}
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Cloud">Cloud</option>
            <option value="General">General</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="course-students">Initial Enrolled Students</label>
          <input
            id="course-students"
            type="number"
            min="0"
            placeholder="e.g. 150"
            value={course.students}
            onChange={(e) => setCourse({ ...course, students: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course-rating">Initial Star Rating</label>
          <input
            id="course-rating"
            type="number"
            step="0.1"
            min="1"
            max="5"
            placeholder="e.g. 4.8"
            value={course.rating}
            onChange={(e) => setCourse({ ...course, rating: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="course-description">Description</label>
          <textarea
            id="course-description"
            rows="4"
            placeholder="Enter a brief summary of what students will learn..."
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
