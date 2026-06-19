import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FaLaptopCode, FaServer, FaDatabase, FaCloud, FaThLarge, FaPlusCircle, FaEnvelope, FaInbox } from "react-icons/fa";

function Sidebar() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  const categories = [
    { name: "Frontend", icon: <FaLaptopCode style={{ marginRight: "10px" }} /> },
    { name: "Backend", icon: <FaServer style={{ marginRight: "10px" }} /> },
    { name: "Database", icon: <FaDatabase style={{ marginRight: "10px" }} /> },
    { name: "Cloud", icon: <FaCloud style={{ marginRight: "10px" }} /> }
  ];

  return (
    <aside>
      <h3>Categories</h3>
      {categories.map((cat) => {
        const isActive = location.pathname === "/" && activeCategory === cat.name;
        return (
          <p key={cat.name}>
            <Link 
              to={`/?category=${cat.name}`} 
              className={isActive ? "active" : ""}
            >
              {cat.icon}
              {cat.name}
            </Link>
          </p>
        );
      })}

      <hr />

      <h3>Quick Menu</h3>
      <p>
        <Link 
          to="/" 
          className={location.pathname === "/" && !activeCategory ? "active" : ""}
        >
          <FaThLarge style={{ marginRight: "10px" }} />
          Dashboard
        </Link>
      </p>
      <p>
        <Link 
          to="/add-course" 
          className={location.pathname === "/add-course" ? "active" : ""}
        >
          <FaPlusCircle style={{ marginRight: "10px" }} />
          Add Course
        </Link>
      </p>
      <p>
        <Link 
          to="/contact" 
          className={location.pathname === "/contact" ? "active" : ""}
        >
          <FaEnvelope style={{ marginRight: "10px" }} />
          Contact
        </Link>
      </p>
      <p>
        <Link 
          to="/admin" 
          className={location.pathname === "/admin" ? "active" : ""}
        >
          <FaInbox style={{ marginRight: "10px" }} />
          Admin Inbox
        </Link>
      </p>
    </aside>
  );
}

export default Sidebar;
