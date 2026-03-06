import create from 'zustand';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      set({
        user: response.data.user,
        token: response.data.token,
        error: null,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Login failed',
        loading: false,
      });
      throw error;
    }
  },

  register: async (name, email, password) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      set({
        user: response.data.user,
        token: response.data.token,
        error: null,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Registration failed',
        loading: false,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  updateProfile: async (profileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/auth/profile`, profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      set({ user: response.data.user });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Update failed' });
      throw error;
    }
  },
}));

export const useResumeStore = create((set) => ({
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,

  createResume: async (title, content, template) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${API_BASE_URL}/resume`, {
        title,
        content,
        template,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      set((state) => ({
        resumes: [response.data.resume, ...state.resumes],
        error: null,
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Creation failed', loading: false });
      throw error;
    }
  },

  getResumes: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/resume`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      set({ resumes: response.data, error: null, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Fetch failed', loading: false });
      throw error;
    }
  },

  updateResume: async (id, title, content, template) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/resume/${id}`, {
        title,
        content,
        template,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      set((state) => ({
        resumes: state.resumes.map((r) => (r._id === id ? response.data.resume : r)),
        currentResume: response.data.resume,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Update failed' });
      throw error;
    }
  },

  optimizeForJob: async (resumeId, jobKeywords) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/optimize`, {
        jobKeywords,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      set((state) => ({
        resumes: state.resumes.map((r) => (r._id === resumeId ? response.data.resume : r)),
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Optimization failed' });
      throw error;
    }
  },

  generatePDF: async (resumeId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/pdf`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'PDF generation failed' });
      throw error;
    }
  },
}));

export const useJobStore = create((set) => ({
  jobs: [],
  loading: false,
  error: null,

  addJob: async (jobData) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${API_BASE_URL}/jobs`, jobData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      set((state) => ({
        jobs: [response.data.job, ...state.jobs],
        error: null,
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to add job', loading: false });
      throw error;
    }
  },

  getJobs: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      set({ jobs: response.data, error: null, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Fetch failed', loading: false });
      throw error;
    }
  },

  matchWithJob: async (resumeId, jobId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/jobs/${jobId}/match`,
        { resumeId, jobId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Match failed' });
      throw error;
    }
  },
}));
