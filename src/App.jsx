function App() {
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

        <section id="contact">
          <h3>Contact</h3>
          <p>Email us at: hello@focusmate.com</p>
        </section>
      </main>

      <footer>
  <p>© 2025 FocusMate. All rights reserved.</p>
  <p><a href="mailto:hello@focusmate.com">Contact us</a></p>
</footer>

<a href="#home" className="scroll-top">⬆️</a>

    </div>
  );
}

export default App;
