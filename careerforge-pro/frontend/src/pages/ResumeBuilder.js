import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store';
import '../styles/ResumeBuilder.css';

export default function ResumeBuilder() {
  const [step, setStep] = useState('personal');
  const [resume, setResume] = useState({
    title: '',
    content: {
      personal: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        headline: '',
        summary: '',
      },
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      projects: [],
    },
    template: 'modern',
  });

  const { createResume, loading, error } = useResumeStore();
  const navigate = useNavigate();

  const handlePersonalChange = (field, value) => {
    setResume((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        personal: {
          ...prev.content.personal,
          [field]: value,
        },
      },
    }));
  };

  const handleAddExperience = () => {
    setResume((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        experience: [
          ...prev.content.experience,
          {
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false,
            description: '',
          },
        ],
      },
    }));
  };

  const handleAddEducation = () => {
    setResume((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        education: [
          ...prev.content.education,
          {
            school: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            details: '',
          },
        ],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createResume(resume.title, resume.content, resume.template);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="builder-container">
      <div className="builder-header">
        <h1>Resume Builder</h1>
        <p>Create and optimize your professional resume</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="builder-form">
        <div className="form-steps">
          <button
            type="button"
            className={`step-btn ${step === 'personal' ? 'active' : ''}`}
            onClick={() => setStep('personal')}
          >
            Personal Info
          </button>
          <button
            type="button"
            className={`step-btn ${step === 'experience' ? 'active' : ''}`}
            onClick={() => setStep('experience')}
          >
            Experience
          </button>
          <button
            type="button"
            className={`step-btn ${step === 'education' ? 'active' : ''}`}
            onClick={() => setStep('education')}
          >
            Education
          </button>
          <button
            type="button"
            className={`step-btn ${step === 'skills' ? 'active' : ''}`}
            onClick={() => setStep('skills')}
          >
            Skills
          </button>
        </div>

        <div className="form-content">
          {step === 'personal' && (
            <div className="form-section">
              <h2>Personal Information</h2>

              <div className="form-group">
                <label>Resume Title</label>
                <input
                  type="text"
                  value={resume.title}
                  onChange={(e) => setResume({ ...resume, title: e.target.value })}
                  placeholder="e.g., Software Engineer Resume"
                  required
                />
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={resume.content.personal.fullName}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={resume.content.personal.email}
                    onChange={(e) => handlePersonalChange('email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={resume.content.personal.phone}
                    onChange={(e) => handlePersonalChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={resume.content.personal.location}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  placeholder="City, State"
                />
              </div>

              <div className="form-group">
                <label>Professional Headline</label>
                <input
                  type="text"
                  value={resume.content.personal.headline}
                  onChange={(e) => handlePersonalChange('headline', e.target.value)}
                  placeholder="e.g., Full Stack Developer | 5+ Years Experience"
                />
              </div>

              <div className="form-group">
                <label>Professional Summary</label>
                <textarea
                  value={resume.content.personal.summary}
                  onChange={(e) => handlePersonalChange('summary', e.target.value)}
                  placeholder="Write a brief summary about yourself..."
                  rows="5"
                />
              </div>

              <div className="form-group">
                <label>Template</label>
                <select
                  value={resume.template}
                  onChange={(e) => setResume({ ...resume, template: e.target.value })}
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
            </div>
          )}

          {step === 'experience' && (
            <div className="form-section">
              <h2>Work Experience</h2>
              {resume.content.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h3>Position {index + 1}</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Job Title</label>
                      <input type="text" placeholder="Senior Developer" />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input type="text" placeholder="Company Name" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input type="month" />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input type="month" />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={handleAddExperience} className="btn-secondary">
                + Add Experience
              </button>
            </div>
          )}

          {step === 'education' && (
            <div className="form-section">
              <h2>Education</h2>
              {resume.content.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h3>Degree {index + 1}</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>School/University</label>
                      <input type="text" placeholder="University Name" />
                    </div>
                    <div className="form-group">
                      <label>Degree</label>
                      <input type="text" placeholder="Bachelor of Science" />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={handleAddEducation} className="btn-secondary">
                + Add Education
              </button>
            </div>
          )}

          {step === 'skills' && (
            <div className="form-section">
              <h2>Skills</h2>
              <div className="form-group">
                <label>Add Skills (comma-separated)</label>
                <textarea
                  placeholder="JavaScript, React, Node.js, MongoDB, AWS..."
                  rows="5"
                  defaultValue={resume.content.skills.join(', ')}
                  onChange={(e) =>
                    setResume({
                      ...resume,
                      content: {
                        ...resume.content,
                        skills: e.target.value.split(',').map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary btn-lg">
            {loading ? 'Saving...' : 'Save Resume'}
          </button>
        </div>
      </form>
    </div>
  );
}
