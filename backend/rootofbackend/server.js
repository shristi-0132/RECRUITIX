const express = require('express');
const app = express();

// middleware
app.use(express.json());

// routes
const authRoutes = require('../routes/authRoutes');
app.use('/auth', authRoutes);
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);

// test route
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// port
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});