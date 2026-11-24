const store = {
  posts: [
    {
      id: 1,
      title: "Getting Started with Node.js",
      content: "Node.js is a JavaScript runtime...",
      author: "John Doe",
      createdAt: "2026-01-15T10:00:00Z",
      likes: 10,
    },
    {
      id: 2,
      title: "Express.js Fundamentals",
      content: "Express is a web framework...",
      author: "Jane Smith",
      createdAt: "2026-01-16T14:30:00Z",
      likes: 15,
    },
  ],
  nextId: 3,
  users: [
    { id: 1, name: "John Doe", role: "member" },
    { id: 2, name: "Jane Smith", role: "moderator" },
  ],
  nextUserId: 3,
};

module.exports = store;
