require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   CORS
========================= */
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

/* =========================
   ROUTES
========================= */
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const jobRoutes = require("./routes/Jobroutes");
const recruiterRoutes = require("./routes/recruiterRoutes");

/* =========================
   MOUNT ROUTES
========================= */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use("/student", studentRoutes);
app.use("/student", applicationRoutes);

app.use("/", jobRoutes);

/* IMPORTANT FIX */
app.use("/recruiter", recruiterRoutes);

app.get("/", (req, res) => {
  res.send("Recruitix server is running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});