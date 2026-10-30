import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Profile() {
    const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '', phone: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch current profile on load (optional: requires a GET endpoint in backend)
        // If GET isn't implemented yet, this form acts as an upsert.
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put('/profiles/me', profile);
            setMessage('Profile updated successfully! RabbitMQ event published.');
        } catch (err) {
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/dashboard')}>&larr; Back to Dashboard</button>
            <h2>Update Profile</h2>
            {message && <div className="alert alert-info">{message}</div>}
            
            <form onSubmit={handleUpdate} className="mt-3">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" value={profile.lastName} onChange={(e) => setProfile({...profile, lastName: e.target.value})} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} required />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Save Profile</button>
            </form>
        </div>
    );
}