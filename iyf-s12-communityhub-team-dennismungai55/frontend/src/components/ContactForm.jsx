import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    // Reset form state
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "15px 0",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "400px",
        background: "#fff",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>Get in Touch</h4>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your email"
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your message"
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          minHeight: "80px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </form>
  );
}

export default ContactForm;
