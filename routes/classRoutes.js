const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const SERVER_DIRECTORY = '/Users/matthewxu/Desktop/B6 Server/data';

// Get Class IDs
router.get('/class-ids', (req, res) => {
  try {
    const classIds = fs.readdirSync(SERVER_DIRECTORY);
    res.json(classIds);
  } catch (error) {
    res.status(500).send('Error retrieving class IDs');
  }
});

// Add a New Class
router.post('/class', (req, res) => {
  const { classId } = req.body;
  const classDir = path.join(SERVER_DIRECTORY, classId);
  try {
    if (!fs.existsSync(classDir)) {
      fs.mkdirSync(classDir);
      res.status(201).send('Class created');
    } else {
      res.status(400).send('Class already exists');
    }
  } catch (error) {
    res.status(500).send('Error creating class');
  }
});

// Get Class Options
router.get('/class-options', (req, res) => {
    try {
      const classIds = fs.readdirSync(SERVER_DIRECTORY);
      res.json(classIds);
    } catch (error) {
      res.status(500).send('Error retrieving class options');
    }
  });

module.exports = router;