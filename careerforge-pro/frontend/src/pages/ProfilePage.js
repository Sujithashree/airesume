import React, { useState } from 'react';
import { useAuthStore } from '../store';
import '../styles/Profile.css';

export default function ProfilePage() {
  const { user, updateProfile, loading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.profile?.phone || '',
    headline: user?.profile?.headline || '',
    summary: user?.profile?.summary || '',
    location: user?.profile?.location || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Update your profile information</p>
      </div>

      <div className="profile-card">
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h2>Personal Information</h2>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={user?.email} disabled placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Professional Information</h2>

            <div className="form-group">
              <label>Professional Headline</label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="e.g., Full Stack Developer | AI Enthusiast"
              />
            </div>

            <div className="form-group">
              <label>Professional Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Write a brief summary about yourself..."
                rows="5"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Subscription</h2>
            <div className="subscription-info">
              <div className="info-row">
                <span>Current Plan:</span>
                <strong>{user?.subscription?.plan?.toUpperCase() || 'FREE'}</strong>
              </div>
              <div className="info-row">
                <span>Status:</span>
                <strong>{user?.subscription?.status || 'ACTIVE'}</strong>
              </div>
              <div className="info-row">
                <span>Resumes Created:</span>
                <strong>{user?.resumeCount || 0}</strong>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary btn-lg">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
