function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 text-gray-800">
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">FocusMate++</h1>
        <a href="#" className="text-indigo-500 hover:underline">Dashboard</a>
      </nav>

      <main className="flex flex-col items-center justify-center py-20">
        <h2 className="text-3xl font-semibold mb-6">Ready to focus?</h2>
        <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">
          Start Focus Session
        </button>
      </main>
    </div>
  )
}

export default App;
