import { motion } from "framer-motion";
import {
  FaUserTie,
  FaBook,
  FaClock,
  FaVideo,
  FaPlayCircle,
  FaAward
} from "react-icons/fa";

function CourseDetails() {

  const modules = [
    "Introduction",
    "React Fundamentals",
    "Components & Props",
    "Hooks",
    "Routing",
    "API Integration",
    "Project Development"
  ];

  return (
    <div className="course-details">

      <section className="course-hero">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h1>React JS Master Course</h1>

          <p>
            Learn ReactJS from basics to advanced
            with real-world projects.
          </p>

          <button>
            Start First Lesson
          </button>

        </motion.div>

      </section>

      <section className="course-info-grid">

        <motion.div
          className="info-card"
          whileHover={{ scale: 1.05 }}
        >

          <FaBook />

          <h3>Course Name</h3>

          <p>React JS Master Course</p>

        </motion.div>

        <motion.div
          className="info-card"
          whileHover={{ scale: 1.05 }}
        >

          <FaUserTie />

          <h3>Instructor</h3>

          <p>Dinesh Kumar</p>

        </motion.div>

        <motion.div
          className="info-card"
          whileHover={{ scale: 1.05 }}
        >

          <FaAward />

          <h3>Category</h3>

          <p>Frontend Development</p>

        </motion.div>

        <motion.div
          className="info-card"
          whileHover={{ scale: 1.05 }}
        >

          <FaClock />

          <h3>Duration</h3>

          <p>8 Weeks</p>

        </motion.div>

        <motion.div
          className="info-card"
          whileHover={{ scale: 1.05 }}
        >

          <FaVideo />

          <h3>Total Lessons</h3>

          <p>45 Lessons</p>

        </motion.div>

      </section>

      <section className="learning-section">

        <h2>What You'll Learn</h2>

        <ul>
          <li>React Components</li>
          <li>Props and State</li>
          <li>React Router</li>
          <li>Axios API Calls</li>
          <li>Hooks</li>
          <li>Project Deployment</li>
        </ul>

      </section>

      <section className="progress-section">

        <h2>Course Progress</h2>

        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>

        <p>25% Completed</p>

      </section>

      <section className="module-section">

        <h2>Course Modules</h2>

        {
          modules.map((module, index) => (

            <motion.div
              key={index}
              className="module-card"
              whileHover={{ x: 10 }}
            >

              <FaPlayCircle />

              <span>{module}</span>

            </motion.div>

          ))
        }

      </section>

    </div>
  );
}

export default CourseDetails;
