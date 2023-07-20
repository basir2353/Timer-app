import React, { useState, useEffect } from 'react';

const TimerApp: React.FC = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Function to format time in HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Function to start the timer
  const startTimer = () => {
    if (!timerInterval) {
      const interval = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime + 1);
      }, 1000);
      setTimerInterval(interval);
    }
  };

  // Function to stop the timer
  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  // Function to reset the timer
  const resetTimer = () => {
    stopTimer();
    setTimeInSeconds(0);
  };

  // Cleanup timerInterval on unmount
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className="timer-container">
    <h1>Timer App</h1>
    <div className="timer-box">
      <p className="timer">{formatTime(timeInSeconds)}</p>
      <div className="buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  </div>
  );
};

export default TimerApp;
