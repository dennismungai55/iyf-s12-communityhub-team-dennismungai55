import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import PostCard from "./components/PostCard";
import Button from "./components/Button";
import Counter from "./components/Counter";
import Toggle from "./components/Toggle";
import UserGreeting from "./components/UserGreeting";
import ContactForm from "./components/ContactForm";
import EventExamples from "./components/EventExamples";
import TodoList from "./components/TodoList";

function App() {
  const currentUser = { name: "Amina Otieno", isAdmin: true };

  const posts = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React...",
      author: "Amina Otieno",
      date: "Jan 15, 2026",
    },
    {
      id: 2,
      title: "JavaScript Best Practices",
      excerpt: "Write cleaner code...",
      author: "Brian Kamau",
      date: "Jan 10, 2026",
    },
  ];

  return (
    <Layout>
      <div className="container" style={{ display: "flex", gap: "20px" }}>
        <Sidebar />

        <main style={{ flex: 1 }}>
          <UserGreeting user={currentUser} />

          <h2>Welcome to CommunityHub</h2>

          {/* Interactive State Components */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <Counter />
            <Toggle />
          </div>

          {/* Forms, Events, and Array State */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <ContactForm />
            <EventExamples />
            <TodoList />
          </div>

          <h3 style={{ marginTop: "30px" }}>Recent Posts</h3>
          <div className="post-list">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
              />
            ))}
          </div>

          <div style={{ marginTop: "20px" }}>
            <Button text="Load More Posts" variant="primary" />
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default App;
