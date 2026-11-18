function Greeting({ name = "Guest" }) {
  return (
    <section>
      <h2>Hello, {name}!</h2>
      <p>Welcome to CommunityHub.</p>
    </section>
  );
}

export default Greeting;