import React, { useState, useEffect } from "react";
import "./App.css";

const MODES = {
  focus: { label: "Focus", minutes: 25 },
  short: { label: "Short Break", minutes: 5 },
  long: { label: "Long Break", minutes: 15 },
};

function App() {
  const [mode, setMode] = useState("focus");
  const [totalDuration, setTotalDuration] = useState(MODES.focus.minutes * 60);
  const [timeLeft, setTimeLeft] = useState(MODES.focus.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [showTasks, setShowTasks] = useState(true);

  // time ticking
  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // mode change(s)
  useEffect(() => {
    const base = MODES[mode].minutes * 60;
    setTotalDuration(base);
    setTimeLeft(base);
    setIsRunning(false);
  }, [mode]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  // add task(s)
  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input.trim(), done: false }]);
      setInput("");
    }
  };

  const toggleTask = (idx) => {
    setTasks(
      tasks.map((t, i) =>
        i === idx ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTask = (idx) => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  // keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.code === "Space") {
        e.preventDefault();
        setIsRunning((prev) => !prev);
      }
      if (e.key === "r" || e.key === "R") {
        setTimeLeft(totalDuration);
        setIsRunning(false);
      }
      if (["1", "2", "3"].includes(e.key)) {
        setMode(e.key === "1" ? "focus" : e.key === "2" ? "short" : "long");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [totalDuration]);

  return (
    <div className="app-container">
      <div className="main-timer">
        <h1 className="header">FocusMate Pomodoro</h1>

        {/* Modes */}
        <div className="modes">
          {Object.entries(MODES).map(([key, val]) => (
            <div
              key={key}
              className={`mode ${mode === key ? "active" : ""}`}
              onClick={() => setMode(key)}
            >
              {val.label}
            </div>
          ))}
        </div>

        {/* Keys */}
        <div className="controls-hint">
          ⏯ Space = Start/Pause | 🔄 R = Reset | 🔢 1/2/3 = Switch Modes
        </div>

        {/* Timer + Keys */}
        <div className="timer-container">
          <div className="timer">
            <svg className="progress" viewBox="0 0 100 100">
              <circle
                className="bg"
                cx="50"
                cy="50"
                r="46"
              />
              <circle
                className="fg"
                cx="50"
                cy="50"
                r="46"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={
                  (1 - timeLeft / totalDuration) * (2 * Math.PI * 46)
                }
              />
            </svg>
            <div className="time">{minutes}:{seconds}</div>
          </div>
        </div>

        {/* Adjuster + Buttons */}
        {mode === "focus" && (
          <div className="time-adjuster">
            <button
              onClick={() => {
                setTotalDuration((prev) => {
                  const next = Math.max(25 * 60, prev - 60);
                  if (!isRunning) setTimeLeft(next);
                  return next;
                });
              }}
            >
              −
            </button>
            <span>Adjust Focus Time</span>
            <button
              onClick={() => {
                setTotalDuration((prev) => {
                  const next = prev + 60;
                  if (!isRunning) setTimeLeft(next);
                  return next;
                });
              }}
            >
              ＋
            </button>
          </div>
        )}

        <div className="controls">
          <button
            className="primary"
            onClick={() => setIsRunning((p) => !p)}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              setTimeLeft(totalDuration);
              setIsRunning(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Tasks Panel */}
      <div className="tasks-panel">
        <button
          className="toggle-btn"
          onClick={() => setShowTasks((s) => !s)}
        >
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>
        <h2>My Tasks</h2>
        {showTasks && (
          <div className="tasks">
            <div className="task-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add a task..."
              />
              <button onClick={addTask}>Add</button>
            </div>
            <div className="task-list">
              {tasks.map((task, idx) => (
                <div
                  key={idx}
                  className={`task-item ${task.done ? "done" : ""}`}
                >
                  <span onClick={() => toggleTask(idx)}>{task.text}</span>
                  <button onClick={() => deleteTask(idx)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;