import { useState } from "react";

function AccessibleForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessage("Please complete all required fields.");
      return;
    }

    setMessage(`Thank you, ${name}. Your form was submitted!`);

    setName("");
    setEmail("");
  }

  return (
    <section>
      <h2>Contact CommunityHub</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="contact-name">Full Name</label>

          <input
            id="contact-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="contact-email">Email Address</label>

          <input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <p role="status" aria-live="polite">
        {message}
      </p>
    </section>
  );
}

export default AccessibleForm;
