import PostCard from "./PostCard.jsx";

function PostList() {
  const posts = [
    {
      id: 1,
      title: "My First React Project",
      author: "Shaniz",
      content: "I am learning how to build reusable React components."
    },
    {
      id: 2,
      title: "Why I Love Programming",
      author: "Dennis",
      content: "Programming helps us solve real-world problems."
    },
    {
      id: 3,
      title: "Learning Together",
      author: "Grace",
      content: "Working with others makes learning more interesting."
    }
  ];

  return (
    <section>
      <h1>Community Posts</h1>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          author={post.author}
          content={post.content}
        />
      ))}
    </section>
  );
}

export default PostList;