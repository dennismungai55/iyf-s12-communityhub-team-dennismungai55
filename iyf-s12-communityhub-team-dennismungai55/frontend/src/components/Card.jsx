function Card({ children, title }) {
  return (
    <div
      className="card"
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        margin: "10px 0",
      }}
    >
      {title && (
        <h3 className="card-title" style={{ marginTop: 0 }}>
          {title}
        </h3>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
