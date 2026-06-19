import { useEffect, useState } from "react";
import API from "../api/courseApi";
import { FaBookReader, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    try {
      const response = await API.get("/courses");
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="page-container">
      <Link to="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", color: "var(--primary)", fontSize: "14px", fontWeight: "600", marginBottom: "15px" }}>
        <FaArrowLeft style={{ marginRight: "6px" }} /> Back to Dashboard
      </Link>

      <h1>Available Courses</h1>
      <h3>Total Courses Registered: {courses.length}</h3>

      <div className="course-list-wrapper">
        {courses.map((course) => (
          <div key={course._id} className="course-item">
            <div className="course-item-info">
              <FaBookReader style={{ color: "var(--primary)" }} />
              <div>
                <div>{course.title}</div>
                {course.category && (
                  <span style={{ fontSize: "12px", background: "var(--border-glass)", padding: "2px 8px", borderRadius: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>
                    {course.category}
                  </span>
                )}
              </div>
            </div>
            <div className="course-item-meta">
              👤 {course.students} Enrolled &bull; ⭐ {Number(course.rating || 4.5).toFixed(1)} Rating
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
