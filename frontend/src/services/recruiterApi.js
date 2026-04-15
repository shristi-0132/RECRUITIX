import api from "./api";

/* =========================
   RECRUITER JOBS
========================= */

// Get all jobs posted by recruiter
export const getRecruiterJobs = () =>
  api.get("/recruiter/job/list");

// Create new job
export const postJob = (jobData) =>
  api.post("/recruiter/job/create", jobData);

// Get applicants for a job
export const getJobApplicants = (job_id) =>
  api.get(`/recruiter/job/applicants/${job_id}`);

// Rank applicants
export const rankApplicants = (job_id) =>
  api.post(`/recruiter/job/rank/${job_id}`);

// Shortlist candidate
export const shortlistApplicant = (
  application_id
) =>
  api.post(
    `/recruiter/shortlist/${application_id}`
  );

// Get shortlisted
export const getShortlisted = (job_id) =>
  api.get(
    `/recruiter/job/applicants/${job_id}`
  );

// Select candidate
export const selectApplicant = ({
  job_id,
  student_id,
}) =>
  api.post(
    "/recruiter/shortlist/select",
    {
      job_id,
      student_id,
    }
  );

// Reject candidate
export const rejectApplicant = ({
  job_id,
  student_id,
}) =>
  api.post(
    "/recruiter/shortlist/reject",
    {
      job_id,
      student_id,
    }
  );