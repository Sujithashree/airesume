import React, { useEffect } from 'react';
import { useResumeStore, useJobStore } from '../store';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { resumes, getResumes } = useResumeStore();
  const { jobs, getJobs } = useJobStore();

  useEffect(() => {
    getResumes();
    getJobs();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your progress</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Your Resumes</h3>
          <div className="stat-number">{resumes.length}</div>
          <p>Resume documents created</p>
        </div>

        <div className="dashboard-card">
          <h3>Job Matches</h3>
          <div className="stat-number">{jobs.length}</div>
          <p>Jobs analyzed and matched</p>
        </div>

        <div className="dashboard-card">
          <h3>ATS Score</h3>
          <div className="stat-number">
            {resumes.length > 0
              ? Math.round(
                  resumes.reduce((sum, r) => sum + (r.atsScore || 0), 0) / resumes.length
                )
              : 0}
          </div>
          <p>Average ATS optimization score</p>
        </div>

        <div className="dashboard-card">
          <h3>Active Plan</h3>
          <div className="stat-number">Free</div>
          <p>Current subscription plan</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Resumes</h2>
        <div className="resume-list">
          {resumes.slice(0, 5).map((resume) => (
            <div key={resume._id} className="resume-item">
              <div className="resume-info">
                <h4>{resume.title}</h4>
                <p className="status-badge">{resume.status}</p>
              </div>
              <div className="resume-score">
                <div className="ats-score">{resume.atsScore || 0}</div>
                <small>ATS Score</small>
              </div>
            </div>
          ))}
          {resumes.length === 0 && <p className="empty-state">No resumes yet. Create one to get started!</p>}
        </div>
      </div>
    </div>
  );
}
