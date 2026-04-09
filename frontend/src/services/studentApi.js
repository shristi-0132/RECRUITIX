import api from './api';

export const getProfile      = ()       => api.get('/student/profile');
export const createProfile   = (data)   => api.post('/student/profile', data);
export const updateProfile   = (data)   => api.put('/student/profile', data);
export const applyJob        = (job_id) => api.post('/student/apply', { job_id });
export const getApplications = ()       => api.get('/student/applications');