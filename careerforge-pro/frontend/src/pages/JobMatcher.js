import React, { useState, useEffect } from 'react';
import { useResumeStore, useJobStore } from '../store';
import '../styles/JobMatcher.css';

export default function JobMatcher() {
  const [jobUrl, setJobUrl] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const { addJob, jobs, getJobs, matchWithJob } = useJobStore();
  const { resumes, getResumes } = useResumeStore();
  const [loading, setLoading] = useState(false);
  const [selectedResume, setSelectedResume] = useState('');
  const [matchResults, setMatchResults] = useState(null);

  useEffect(() => {
    getJobs();
    getResumes();
  }, []);

  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addJob({
        jobTitle,
        company,
        description: jobDescription,
        url: jobUrl,
      });
      setJobUrl('');
      setJobTitle('');
      setCompany('');
      setJobDescription('');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleMatchJob = async (jobId) => {
    if (!selectedResume) {
      alert('Please select a resume');
      return;
    }

    try {
      const result = await matchWithJob(selectedResume, jobId);
      setMatchResults(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="job-matcher-container">
      <div className="matcher-header">
        <h1>Job Matcher</h1>
        <p>Analyze job descriptions and match them with your resumes</p>
      </div>

      <div className="matcher-grid">
        <div className="matcher-section add-job">
          <h2>Add Job Description</h2>
          <form onSubmit={handleAddJob}>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Senior Developer"
                required
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name"
                required
              />
            </div>

            <div className="form-group">
              <label>Job URL (optional)</label>
              <input
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://example.com/job/123"
              />
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows="10"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Analyzing...' : 'Analyze Job'}
            </button>
          </form>
        </div>

        <div className="matcher-section job-list">
          <h2>Jobs Analyzed</h2>

          <div className="form-group">
            <label>Select Resume to Match</label>
            <select value={selectedResume} onChange={(e) => setSelectedResume(e.target.value)}>
              <option value="">Choose a resume...</option>
              {resumes.map((resume) => (
                <option key={resume._id} value={resume._id}>
                  {resume.title}
                </option>
              ))}
            </select>
          </div>

          <div className="jobs-list">
            {jobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-header">
                  <h3>{job.jobTitle}</h3>
                  <span className="company-badge">{job.company}</span>
                </div>

                <div className="job-details">
                  <p className="description">{job.description?.substring(0, 200)}...</p>

                  {job.extractedKeywords && (
                    <div className="keywords">
                      <strong>Keywords:</strong>
                      <div className="keyword-tags">
                        {job.extractedKeywords.slice(0, 5).map((kw, i) => (
                          <span key={i} className="keyword-tag">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.matchScore && (
                    <div className="match-score">
                      <div className="score-bar">
                        <div className="score-fill" style={{ width: `${job.matchScore}%` }}></div>
                      </div>
                      <p>{job.matchScore}% Match</p>
                    </div>
                  )}
                </div>

                <button
                  className="btn-secondary"
                  onClick={() => handleMatchJob(job._id)}
                  disabled={!selectedResume}
                >
                  Match with Resume
                </button>
              </div>
            ))}

            {jobs.length === 0 && <p className="empty-state">No jobs added yet. Add one to get started!</p>}
          </div>
        </div>
      </div>

      {matchResults && (
        <div className="match-results">
          <h2>Match Results</h2>
          <div className="results-card">
            <div className="match-score-large">{matchResults.matchScore}%</div>
            <p>Keyword Match Score</p>

            {matchResults.suggestions && (
              <div className="suggestions">
                <h3>Suggestions</h3>
                <ul>
                  {matchResults.suggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {matchResults.matchedKeywords && (
              <div className="matched-keywords">
                <h3>Matched Keywords</h3>
                <div className="keyword-tags">
                  {matchResults.matchedKeywords.map((kw, i) => (
                    <span key={i} className="keyword-tag-matched">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
