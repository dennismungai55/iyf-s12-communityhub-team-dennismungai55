function EventExamples() {
  const handleClick = () => {
    console.log("Button clicked!");
    alert("Button clicked!");
  };

  const handleInput = (event) => {
    console.log("Input value:", event.target.value);
  };

  const handleItemClick = (itemId) => {
    console.log("Item clicked:", itemId);
    alert(`Clicked item ID: ${itemId}`);
  };

  return (
    <div
      style={{
        margin: "15px 0",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        maxWidth: "400px",
        background: "#fff",
      }}
    >
      <h4 style={{ margin: "0 0 15px 0" }}>Event Handler Examples</h4>

      {/* Basic click */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleClick} style={{ padding: "6px 12px" }}>
          Click Me
        </button>
      </div>

      {/* With event */}
      <div style={{ marginBottom: "10px" }}>
        <input
          onChange={handleInput}
          placeholder="Type to see console logs..."
          style={{ padding: "6px", width: "100%", boxSizing: "border-box" }}
        />
      </div>

      {/* With parameter - arrow function */}
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => handleItemClick(123)}
          style={{ padding: "6px 12px" }}
        >
          Item 123 Action
        </button>
      </div>

      {/* Prevent default */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted without reloading page!");
          alert("Form submitted without reload!");
        }}
      >
        <button
          type="submit"
          style={{
            padding: "6px 12px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Submit PreventDefault
        </button>
      </form>
    </div>
  );
}

export default EventExamples;
