import api from './api';

export const getAllJobs  = (params) => api.get('/job/all', { params });
export const getJobById = (job_id) => api.get(`/job/${job_id}`);