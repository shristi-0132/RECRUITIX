import api from "./api";

/* PROFILE */
export const getProfile = () =>
  api.get("/student/profile");

export const createProfile = (
  data
) =>
  api.post(
    "/student/profile",
    data
  );

export const updateProfile = (
  data
) =>
  api.put(
    "/student/profile",
    data
  );

/* JOB APPLICATION */
export const applyJob = (
  job_id
) =>
  api.post(
    "/student/apply",
    { job_id }
  );

/* MY APPLICATIONS */
export const getApplications =
  () =>
    api.get(
      "/student/applications"
    );

/* SHORTLISTED JOBS */
export const getShortlistedJobs =
  () =>
    api.get(
      "/student/shortlisted"
    );