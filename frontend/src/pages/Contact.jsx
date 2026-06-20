import { useState } from "react";
import API from "../api/courseApi";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All Fields Required");
      return;
    }

    try {
      await API.post("/contact", formData);
      toast.success("Message Sent Successfully");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed To Send Message");
    }
  }

  async function fetchMessages() {
    try {
      const response = await API.get("/contact");
      setMessages(response.data);
      setShowMessages(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable To Load Messages");
    }
  }

  return (
    <div className="page-container">
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <br />
        <br />

        <textarea
          rows="5"
          placeholder="Enter Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
        />

        <br />
        <br />

        <button type="submit">Send Message</button>
      </form>

      <br />

      <button className="received-btn" onClick={fetchMessages}>
        Received Messages
      </button>

      <br />
      <br />

      {showMessages && (
        <div>
          {messages.map((msg) => (
            <div key={msg._id} className="message-card">
              <h4>{msg.name}</h4>
              <p>{msg.email}</p>
              <p>{msg.message}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Contact;
