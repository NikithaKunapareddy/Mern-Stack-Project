import { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { FaMoon, FaSun, FaGraduationCap, FaEnvelope, FaPlusCircle, FaBookOpen } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2>
          <FaGraduationCap style={{ fontSize: "30px" }} />
          SkillHub
        </h2>
      </Link>

      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>

        <li
          ref={dropdownRef}
          onClick={() => setOpen(!open)}
          className="menu-item"
          style={{ position: "relative", userSelect: "none" }}
        >
          Courses <span style={{ fontSize: "10px", marginLeft: "2px" }}>▼</span>

          {open && (
            <div className="dropdown">
              <Link to="/courses">
                <FaBookOpen style={{ marginRight: "8px", fontSize: "12px" }} />
                All Courses
              </Link>
              <Link to="/add-course">
                <FaPlusCircle style={{ marginRight: "8px", fontSize: "12px" }} />
                Add Course
              </Link>
            </div>
          )}
        </li>

        <li>
          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
            Contact
          </Link>
        </li>

        <li>
          <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>
            Admin Inbox
          </Link>
        </li>
      </ul>

      <button
        className="theme-btn"
        onClick={() => setDark(!dark)}
        aria-label="Toggle Theme"
      >
        {dark ? <FaSun style={{ color: "#ffb300" }} /> : <FaMoon style={{ color: "#a78bfa" }} />}
      </button>
    </nav>
  );
}

export default Navbar;
