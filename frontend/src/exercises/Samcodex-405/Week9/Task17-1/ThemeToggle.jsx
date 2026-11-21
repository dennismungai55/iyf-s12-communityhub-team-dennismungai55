
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);

    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, [darkMode]);

  return (
    <section>
      <h2>Theme Toggle</h2>
      <p>Current theme: {darkMode ? "Dark" : "Light"}</p>

      <button onClick={() => setDarkMode(!darkMode)}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>
    </section>
  );
}

export default ThemeToggle;
