import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <section>
      <h2>Challenge: Timer</h2>
      <p>{seconds} seconds</p>

      <button onClick={() => setActive(!active)}>
        {active ? "Pause" : "Start"}
      </button>

      <button onClick={() => {
        setActive(false);
        setSeconds(0);
      }}>
        Reset
      </button>
    </section>
  );
}

export default Timer;
