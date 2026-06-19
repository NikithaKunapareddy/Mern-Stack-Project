import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

function Hero() {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Learn Modern Technology</h1>
      <p>
        Build production-ready applications with hands-on labs and tutorials. 
        Master React, Node.js, Express, MongoDB, and modern web engineering.
      </p>
      <button onClick={() => document.querySelector(".search")?.focus()}>
        <FaRocket style={{ marginRight: "8px" }} />
        Start Learning
      </button>
    </motion.section>
  );
}

export default Hero;
