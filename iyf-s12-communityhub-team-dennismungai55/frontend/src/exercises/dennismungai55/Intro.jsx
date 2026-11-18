function Intro() {
  const name = "Dennis Mungai";
  const today = new Date().toLocaleDateString();

  const hour = new Date().getHours();

  let greeting;

  if (hour < 12) {
    greeting = "Good morning!";
  } else if (hour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }

  return (
    <div>
      <h1>Hello, I'm {name}!</h1>

      <p>I'm learning web development and React.</p>

      <p>I'm working with my team to build CommunityHub.</p>

      <p>I enjoy learning new technologies and improving my coding skills.</p>

      <h2>Today's Date: {today}</h2>

      <h2>{greeting}</h2>
    </div>
  );
}

export default Intro;
