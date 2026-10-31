import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '' });
  const [message, setMessage] = useState('');

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://api-gateway-j9ss.onrender.com/api/profiles/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
          setProfile(response.data);
          setMessage('Profile data retrieved successfully!');
      }
    } catch (error) {
      console.error('Error fetching profile data');
      setMessage('No existing profile found. Please save your details.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('https://api-gateway-j9ss.onrender.com/api/profiles/me', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully! RabbitMQ event triggered.');
    } catch (error) {
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>My Profile</h2>
      
      <button 
        type="button" 
        onClick={fetchProfile} 
        style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '15px' }}
      >
        View / Refresh My Data
      </button>

      {message && <div style={{ color: message.includes('failed') || message.includes('No existing') ? 'red' : 'green', marginBottom: '15px' }}>{message}</div>}
      
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
        <label>First Name</label>
        <input 
          type="text" 
          value={profile.firstName} 
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} 
          style={{ padding: '8px' }} 
        />
        
        <label>Last Name</label>
        <input 
          type="text" 
          value={profile.lastName} 
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} 
          style={{ padding: '8px' }} 
        />
        
        <label>Email Address</label>
        <input 
          type="email" 
          value={profile.email} 
          onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
          style={{ padding: '8px' }} 
        />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;