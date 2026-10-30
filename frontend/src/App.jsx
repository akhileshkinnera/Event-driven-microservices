import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import your components (adjust the file paths if your files are in a 'components' folder)
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Automatically redirect the root URL to the login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes (Require JWT token in a real app) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;