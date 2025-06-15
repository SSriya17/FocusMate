import { useState, useEffect, useRef } from 'react';
//timer
const MODES = {
  FOCUS: { label: "Focus", duration: 1500}, //25 mins
  BREAK: { label: "Break", duration: 300 }, // 5 mins
  LONG_BREAK: {label: "Extended Break", duration: 900} //15 mins
};

function App() {

  //timer stuff
  // const [timeLeft, setTimeLeft] = useState(1500); // 25 mins in secs
  // const [showScrollTop, setShowScrollTop] = useState(false); // scroll stuff: for scroll visibility, once it's at the top, button isn't shown
  const timerRef = useRef(null);
  const [mode, setMode] =  useState(MODES.FOCUS); //set values are const above, using vars
  const [timeLeft, setTimeLeft] = useState(MODES.FOCUS.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const circleRef=useRef(null);
  const [hasSelectedMode,setHasSelectedMode] = useState(false); // tracks user has clicked on of the modes



//circle stuff
useEffect(() => {
  const circle = circleRef.current;
  if (!circle) return;

  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const offset = circumference - (timeLeft / mode.duration) * circumference;
  circle.style.strokeDashoffset = offset;
}, [timeLeft, mode]);

  //scroll stuff cont.
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300); //so once it gets past 300px (2-4 inches of the top of the homepage height the button is visible
    };
  window.addEventListener("scroll", handleScroll);
  //to prevent memory leaks
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const startPauseTimer = () => {
    if(isRunning) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if(prev <=1){
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev-1;
        });
      }, 1000);
      setIsRunning(true);
    }
  };
//no necessary anymore, repetative with startPauseTimer()
/*  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = nulll;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }; */

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimeLeft(mode.duration);
    setIsRunning(false);
    // setTimeLeft(1500); // reset to 25 mins
  };

  const switchMode = (newMode) => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setMode(newMode);
    setTimeLeft(newMode.duration);
    setIsRunning(false);
    setHasSelectedMode(true);//UI shows timer
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
      <div>
        <header className="navbar">
          <h1 className="logo">FocusMate</h1>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>
    
        <main>
          <section id="home" className="hero">
            <div className="container">
              <h2>Your productivity partner</h2>
              <p>Stay focused. Stay on track. Get things done — beautifully.</p>
              <button className="start-btn">Get Started</button>
            </div>
          </section>
    
          <section id="about">
            <h3>About</h3>
            <p>FocusMate helps you stay on task by blocking distractions and tracking productivity.</p>
          </section>
    
          <section id="features">
            <h3>Features</h3>
            <ul className="features-list">
              <li>⏱️ Task timer</li>
              <li>🚫 Distraction blocker</li>
              <li>📊 Daily productivity summary</li>
            </ul>
          </section>
    
          <section id="timer" className="timer-section">
            <h3>Select a Mode</h3>
            <div className="mode-buttons">
              {Object.values(MODES).map((m) => (
                <button
                  key={m.label} //important!! -- review concepts later
                  onClick={() => switchMode(m)}
                  disabled={m.label === mode.label && hasSelectedMode} // mode.label: prevent clicking the same mode again
                >
                  {m.label}
                </button>
              ))}
            </div>
            {/* after mode has been selected*/}
                  {hasSelectedMode && (
                  <>
            <div className="progress-container">
              <svg className="progress-ring" width="160" height="160">
                <circle
                  className="progress-ring__circle"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  fill="transparent"
                  r="70"
                  cx="80"
                  cy="80"
                />
                <circle
                  ref={circleRef}
                  className="progress-ring__circle"
                  stroke={mode.label === "Focus" ? "#3b82f6" : mode.label === "Break" ? "#10b981" : "#8b5cf6"}
                  strokeWidth="10"
                  fill="transparent"
                  r="70"
                  cx="80"
                  cy="80"
                />
              </svg>
    
              <div className="timer-text">{formatTime(timeLeft)}</div>
            </div>
    
            <div className="timer-controls">
              <button onClick={startPauseTimer}>{isRunning ? "Pause" : "Start"}</button>
              <button onClick={resetTimer}>Reset</button>
            </div>
            </>
                  )}
          </section>
    
          <section id="contact">
            <h3>Contact</h3>
            <p>Email us at: hello@focusmate.com</p>
          </section>
        </main>
    
        <footer>
          <p>© 2025 FocusMate. All rights reserved.</p>
          <p><a href="mailto:hello@focusmate.com">Contact us</a></p>
        </footer>
    
        {showScrollTop && (
          <a href="#home" className="scroll-top">
            <img src="/up-arrow.svg" alt="Scroll to top" className="scroll-icon" />
          </a>
        )}
      </div>
    );
    
}
export default App;
