import api from './api';

// Get all jobs posted by the logged-in recruiter
export const getRecruiterJobs = () => api.get('/recruiter/jobs');

// Post a new job
export const postJob = (jobData) => api.post('/job/create', jobData);

// Get all applicants for a specific job
export const getJobApplicants = (job_id) => api.get(`/job/applicants/${job_id}`);

// Get shortlisted applicants for a specific job
export const getShortlisted = (job_id) => api.get(`/shortlist/${job_id}`);

// Shortlist an applicant
export const shortlistApplicant = ({ job_id, student_id }) =>
  api.post('/shortlist', { job_id, student_id });

// Select a shortlisted applicant (final hire)
export const selectApplicant = ({ job_id, student_id }) =>
  api.post('/shortlist/select', { job_id, student_id });

// Reject a shortlisted applicant
export const rejectApplicant = ({ job_id, student_id }) =>
  api.post('/shortlist/reject', { job_id, student_id });
