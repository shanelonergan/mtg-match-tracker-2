import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MatchTracker from './components/MatchTracker';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        <Navbar user={user} setUser={setUser} />
        <div className="container">
          <Routes>
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route 
              path="/tracker" 
              element={user ? <MatchTracker user={user} /> : <Navigate to="/signin" />} 
            />
            <Route path="/" element={<h2>Welcome to MTG Match Tracker</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;