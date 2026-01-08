import { useEffect, useState } from "react";

export default function Timer({ time, onTimeUp }) {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    setSeconds(time);
  }, [time]);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp]);

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <p className="font-semibold text-red-500">
      {min}:{sec < 10 ? "0" : ""}{sec}
    </p>
  );
}
