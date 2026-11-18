
function Intro() {
  // Get the current date
  const today = new Date();

  // Format the date so it is easy to read
  const formattedDate = today.toLocaleDateString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Get the current hour
  const currentHour = today.getHours();

  // Choose a greeting based on the time
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <section>
      <h1>Hi, I'm Shaniz Ann Mumbua!</h1>

      <p>
        I am a Computer Programming student at WeCan Academy,
        where I am learning how to build websites and applications.
      </p>

      <p>
        I am interested in web development, backend programming,
        and cybersecurity. I enjoy learning new technologies
        and improving my problem-solving skills.
      </p>

      <p>
        My goal is to become a skilled developer who can build
        useful solutions and contribute to meaningful projects.
      </p>

      <h2>{greeting}!</h2>

      <p>Today is {formattedDate}.</p>
    </section>
  );
}

export default Intro;
