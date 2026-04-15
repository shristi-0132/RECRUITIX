import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* auth pages */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthPage from "./pages/AuthPage";

/* student pages */
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import EditProfile from "./pages/EditProfile";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import ShortlistedJobs from "./pages/ShortlistedJobs";

/* recruiter pages */
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import PostJob from "./pages/recruiter/PostJob";
import ViewApplications from "./pages/recruiter/ViewApplications";
import Shortlisted from "./pages/recruiter/Shortlisted";

function App() {
  return (
    <Router>
      <Routes>
        {/* default */}
        <Route
          path="/"
          element={
            <Navigate
              to="/auth"
              replace
            />
          }
        />

        {/* auth */}
        <Route
          path="/auth"
          element={<AuthPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* student */}
        <Route
          path="/student/dashboard"
          element={
            <StudentDashboard />
          }
        />

        <Route
          path="/student/profile"
          element={
            <StudentProfile />
          }
        />

        <Route
          path="/student/profile/edit"
          element={<EditProfile />}
        />

        <Route
          path="/student/jobs"
          element={<JobListings />}
        />

        <Route
          path="/student/job/:job_id"
          element={<JobDetails />}
        />

        <Route
          path="/student/applications"
          element={
            <MyApplications />
          }
        />

        <Route
          path="/student/shortlisted"
          element={
            <ShortlistedJobs />
          }
        />

        {/* recruiter */}
        <Route
          path="/recruiter/dashboard"
          element={
            <RecruiterDashboard />
          }
        />

        <Route
          path="/recruiter/post-job"
          element={<PostJob />}
        />

        <Route
          path="/recruiter/applications/:job_id"
          element={
            <ViewApplications />
          }
        />

        <Route
          path="/recruiter/shortlisted/:job_id"
          element={
            <Shortlisted />
          }
        />

        {/* fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to="/auth"
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;