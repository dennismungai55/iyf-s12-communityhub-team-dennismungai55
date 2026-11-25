
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [running]);

  return (
    <section>
      <h2>Timer</h2>
      <p>{seconds} seconds</p>

      <button onClick={() => setRunning(!running)}>
        {running ? "Pause" : "Resume"}
      </button>

      <button onClick={() => {
        setSeconds(0);
        setRunning(false);
      }}>
        Reset
      </button>
    </section>
  );
}

export default Timer;
