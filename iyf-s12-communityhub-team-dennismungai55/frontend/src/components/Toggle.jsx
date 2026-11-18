import { useState } from "react";

function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      style={{
        margin: "15px 0",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h4>Toggle Component</h4>
      <p>
        The toggle is <strong>{isOn ? "ON" : "OFF"}</strong>
      </p>
      <button onClick={() => setIsOn(!isOn)}>Toggle</button>
    </div>
  );
}

export default Toggle;
