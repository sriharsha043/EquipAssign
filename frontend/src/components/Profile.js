import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

function Profile() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/api/profile', formData);
            alert(response.data.message);
        } catch (error) {
            alert('Profile update failed');
        }
    };

    return (
        <div className="profile-container">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} value={formData.first_name} required />
                <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} value={formData.last_name} required />
                <input type="text" name="mobile_number" placeholder="Mobile Number" onChange={handleChange} value={formData.mobile_number} required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Profile;
