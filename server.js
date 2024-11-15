// Node.js Main Server File (server/server.js)
const express = require('express');
const cors = require('cors');

const classRoutes = require('./routes/classRoutes');
const fileRoutes = require('./routes/fileRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 5001;

app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from your React frontend
    methods: ['GET', 'POST', 'DELETE', 'PUT'],  // Allow necessary HTTP methods
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', classRoutes);
app.use('/api', fileRoutes);
app.use('/api', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
