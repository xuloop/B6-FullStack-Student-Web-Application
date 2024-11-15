const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const SERVER_DIRECTORY = '/Users/matthewxu/Desktop/B6 Server/data';

// Get Files in a Class Subdirectory
router.get('/class/:classId/files', (req, res) => {
  const { classId } = req.params;
  const classDir = path.join(SERVER_DIRECTORY, classId);
  try {
    if (fs.existsSync(classDir)) {
      const files = fs.readdirSync(classDir);
      res.json(files);
    } else {
      res.status(404).send('Class not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving files');
  }
});

// Add a New File to a Class
router.post('/class/:classId/file', (req, res) => {
  const { classId } = req.params;
  const { fileName } = req.body;
  const filePath = path.join(SERVER_DIRECTORY, classId, fileName);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
      res.status(201).send('File created');
    } else {
      res.status(400).send('File already exists');
    }
  } catch (error) {
    res.status(500).send('Error creating file');
  }
});

module.exports = router;
