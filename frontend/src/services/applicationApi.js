import api from "./api";

export const applyJob = (
  job_id
) =>
  api.post(
    "/student/apply",
    { job_id }
  );

export const getMyApplications =
  () =>
    api.get(
      "/student/applications"
    );

export const getShortlistedJobs =
  () =>
    api.get(
      "/student/shortlisted"
    );