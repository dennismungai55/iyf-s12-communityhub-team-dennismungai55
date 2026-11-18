function UserGreeting({ user }) {
  // Pattern 3: Early return pattern
  if (!user) {
    return <p>Please log in to see community posts.</p>;
  }

  return (
    <div>
      {/* Pattern 1: && operator */}
      {user.isAdmin && (
        <span style={{ color: "red", fontWeight: "bold" }}>[Admin] </span>
      )}
      <p>Welcome back, {user.name}!</p>
    </div>
  );
}

export default UserGreeting;
