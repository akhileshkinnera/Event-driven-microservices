import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const LoginPage = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const endpoint = isRegisterMode
      ? '/api/auth/register'
      : '/api/auth/login';

    try {
      const response = await api.post(endpoint, { username, password });

      if (isRegisterMode) {
        setMessage('Registration successful! Please log in.');
        setIsRegisterMode(false);
        setUsername('');
        setPassword('');
      } else {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage(isRegisterMode ? 'Registration failed.' : 'Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>{isRegisterMode ? 'System Registration' : 'System Login'}</h2>
      
      {message && <div style={{ color: isRegisterMode ? 'green' : 'red', marginBottom: '15px' }}>{message}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isRegisterMode ? 'Register' : 'Login'}
        </button>
      </form>

      <button 
        type="button" 
        onClick={() => {
          setIsRegisterMode(!isRegisterMode);
          setMessage('');
        }}
        style={{ marginTop: '15px', background: 'none', border: 'none', color: '#0d6efd', textDecoration: 'underline', cursor: 'pointer' }}
      >
        {isRegisterMode ? 'Already have an account? Login here' : 'New user? Register here'}
      </button>
    </div>
  );
};

export default LoginPage;