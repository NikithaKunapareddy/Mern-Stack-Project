import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import API from "../api/courseApi";
import { toast } from "react-toastify";

function Home() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const response = await API.get("/courses");
      setCourses(response.data);
    } catch (err) {
      setError("Unable to Load Courses");
      toast.error("Failed to load courses from database");
    } finally {
      setLoading(false);
    }
  }

  // Handle Enrollment
  async function handleEnroll(id) {
    try {
      const response = await API.put(`/courses/${id}/enroll`);
      // Update local state count
      setCourses(prev =>
        prev.map(c => (c._id === id ? { ...c, students: response.data.students } : c))
      );
      toast.success("Successfully enrolled in the course!");
    } catch (err) {
      toast.error("Enrollment failed. Please try again.");
    }
  }

  // Handle Course Deletion
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await API.delete(`/courses/${id}`);
      setCourses(prev => prev.filter(c => c._id !== id));
      toast.success("Course deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete the course.");
    }
  }

  // Helper to change category filter
  function handleCategorySelect(categoryName) {
    if (categoryName) {
      setSearchParams({ category: categoryName });
    } else {
      setSearchParams({});
    }
  }

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading Courses...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "var(--danger)", marginTop: "50px" }}>{error}</h2>;

  // Filter courses by category and text search
  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory
      ? course.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoriesList = ["All", "Frontend", "Backend", "Database", "Cloud"];

  return (
    <>
      <Hero />

      <div className="controls-row">
        <div className="search-wrapper">
          <input
            className="search"
            type="text"
            placeholder="Search Course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="tag-list">
          {categoriesList.map((cat) => {
            const isCatActive = cat === "All" ? !selectedCategory : selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                className={`tag-btn ${isCatActive ? "active" : ""}`}
                onClick={() => handleCategorySelect(cat === "All" ? "" : cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)", fontSize: "16px" }}>
          No courses found matching your criteria. Try adding some!
        </div>
      ) : (
        <div className="courses">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              students={course.students}
              category={course.category}
              description={course.description}
              rating={course.rating}
              onEnroll={handleEnroll}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
