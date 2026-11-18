import { useState } from "react";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  return (
    <form
      style={{
        margin: "15px 0",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px",
      }}
    >
      <h4>User Form Component</h4>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
      <div style={{ fontSize: "0.9em", color: "#555" }}>
        <p>
          <strong>Live Output:</strong>
        </p>
        <p>Name: {name || "(empty)"}</p>
        <p>Email: {email || "(empty)"}</p>
        <p>Age: {age}</p>
      </div>
    </form>
  );
}

export default UserForm;
