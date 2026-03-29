require('dotenv').config({ path: '../.env' }); // load .env from project root
const express = require('express');
const app = express();

app.use(express.json());

// ── Routes ──────────────────────────────────────────────
const authRoutes        = require('../routes/authRoutes');
const userRoutes        = require('../routes/userRoutes');
const studentRoutes     = require('../routes/studentRoutes');
const applicationRoutes = require('../routes/applicationRoutes');

app.use('/auth',    authRoutes);
app.use('/user',    userRoutes);
app.use('/student', studentRoutes);
app.use('/student', applicationRoutes); // /student/apply  /student/applications

// ── Health check ─────────────────────────────────────────
app.get('/', (req, res) => res.send('Recruitix server is running 🚀'));

// ── Start ────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
