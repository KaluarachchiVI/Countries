import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import CountryDetails from './pages/CountryDetails'; // Add this import
import Home from './pages/Home';
import Login from './pages/Login';
import './styles/global.css';
import './styles/animations.css';
import './styles/themes.css';



function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/country/:countryCode" element={<CountryDetails />} />
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;