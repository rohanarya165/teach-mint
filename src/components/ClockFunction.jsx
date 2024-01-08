import React, { useState, useEffect } from "react";

function ClockFunction(props) {
  const [time, setTime] = useState(new Date(props.selectedTime));
  const [isPaused, setIsPaused] = useState(false);
  const [pauseTime, setPauseTime] = useState(null);

  useEffect(() => {
    const update = setInterval(() => {
      if (!isPaused) {
        setTime(new Date());
      }
    }, 1000);

    return () => clearInterval(update);
  }, [isPaused]);

  const handlePauseResumeClick = () => {
    if (isPaused) {
      // Resume the clock
      setIsPaused(false);
      const elapsedMilliseconds = new Date() - pauseTime;
      setTime(new Date(time.getTime() + elapsedMilliseconds));
      setPauseTime(null);
    } else {
      // Pause the clock
      setIsPaused(true);
      setPauseTime(new Date());
    }
  };

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <div className="clockDesign">{time.toLocaleTimeString()}</div>
      <div>
        <button onClick={handlePauseResumeClick} className="dropDownCss">
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}

export default ClockFunction;
