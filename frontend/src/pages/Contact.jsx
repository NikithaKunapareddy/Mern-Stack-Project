import { useState } from "react";
import API from "../api/courseApi";
import { toast } from "react-toastify";
import { FaEnvelopeOpenText } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required");
      return;
    }

    try {
      await API.post("/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message.");
    }
  }

  return (
    <div className="page-container" style={{ maxWidth: "600px" }}>
      <h1>
        <FaEnvelopeOpenText style={{ marginRight: "12px", verticalAlign: "middle" }} />
        Contact Us
      </h1>
      <h3 style={{ marginBottom: "25px" }}>Get in touch with our team for guidance or custom MERN Stack training inquiries.</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contact-name">Your Name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            type="email"
            placeholder="e.g. john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-message">Your Message</label>
          <textarea
            id="contact-message"
            rows="5"
            placeholder="How can we help you?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
