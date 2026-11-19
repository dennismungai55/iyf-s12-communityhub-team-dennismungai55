import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="max-w-xs rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        Elapsed Time
      </p>
      <p className="my-3 font-mono text-4xl font-bold text-slate-900">
        {seconds}s
      </p>
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setIsRunning((prev) => !prev)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
