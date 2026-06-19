import { FaUsers, FaStar, FaTrashAlt } from "react-icons/fa";

function CourseCard({ id, title, students, category, description, rating, onEnroll, onDelete }) {
  return (
    <div className="card">
      {category && <span className="card-badge">{category}</span>}

      <div className="card-content">
        <h2>{title}</h2>
        <p className="card-desc">
          {description || "Learn and master key skills with hands-on practice and expert training."}
        </p>
      </div>

      <div className="card-meta-row">
        <div className="card-meta-students">
          <FaUsers />
          <span>{students} Students</span>
        </div>
        <div className="card-meta-rating">
          <FaStar />
          <span>{Number(rating || 4.5).toFixed(1)}</span>
        </div>
      </div>

      <div className="card-actions">
        <button className="enroll-btn" onClick={() => onEnroll(id)}>
          Enroll Now
        </button>
        <button className="delete-btn" onClick={() => onDelete(id)} title="Delete Course">
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
