import { useEffect, useState } from "react";
import API from "../api/courseApi";
import { toast } from "react-toastify";
import { FaInbox, FaTrash, FaSearch, FaUser, FaEnvelope, FaClock } from "react-icons/fa";

function Admin() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const response = await API.get("/contact");
      setMessages(response.data);
    } catch (error) {
      toast.error("Failed to load contact messages.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await API.delete(`/contact/${id}`);
      setMessages(prev => prev.filter(msg => msg._id !== id));
      toast.success("Message deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the message.");
    }
  }

  // Filter messages based on search query (by sender name, email, or content)
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading Messages Inbox...</h2>;
  }

  return (
    <div className="page-container" style={{ maxWidth: "800px" }}>
      <h1>
        <FaInbox style={{ marginRight: "12px", verticalAlign: "middle" }} />
        Messages Inbox
      </h1>
      <h3 style={{ marginBottom: "25px" }}>View and manage feedback or training inquiries submitted by users.</h3>

      <div className="controls-row" style={{ marginBottom: "25px" }}>
        <div className="search-wrapper" style={{ width: "100%" }}>
          <input
            className="search"
            type="text"
            placeholder="Search messages by sender name, email, or text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div className="no-messages">
          No contact messages found.
        </div>
      ) : (
        <div className="admin-grid">
          {filteredMessages.map((msg) => (
            <div key={msg._id} className="message-card">
              <div className="message-header">
                <div className="message-sender">
                  <h4>
                    <FaUser style={{ marginRight: "6px", fontSize: "13px", color: "var(--text-muted)" }} />
                    {msg.name}
                  </h4>
                  <p>
                    <FaEnvelope style={{ marginRight: "6px", fontSize: "12px" }} />
                    {msg.email}
                  </p>
                </div>
                <div className="message-meta">
                  <span className="message-date">
                    <FaClock style={{ marginRight: "4px" }} />
                    {new Date(msg.createdAt).toLocaleString(undefined, {
                      dateStyle: "short",
                      timeStyle: "short"
                    })}
                  </span>
                  <button
                    className="message-delete-btn"
                    onClick={() => handleDelete(msg._id)}
                    title="Delete Message"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="message-body">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
