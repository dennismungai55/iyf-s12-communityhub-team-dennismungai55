function Stats({ totalPosts, totalLikes }) {
  return (
    <div
      style={{
        padding: "12px 18px",
        background: "#f8f9fa",
        border: "1px solid #e9ecef",
        borderRadius: "8px",
        marginBottom: "20px",
        display: "flex",
        gap: "30px",
        fontWeight: "bold",
        fontSize: "1rem",
        color: "#333",
      }}
    >
      <span>📝 Total Posts: {totalPosts}</span>
      <span>❤️ Total Likes: {totalLikes}</span>
    </div>
  );
}

export default Stats;
