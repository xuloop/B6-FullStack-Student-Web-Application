const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const SERVER_DIRECTORY = '/Users/matthewxu/Desktop/B6 Server/data';

// Get Student Information in a File
router.get('/file/:classId/:file', (req, res) => {
  const { classId, file } = req.params;
  const filePath = path.join(SERVER_DIRECTORY, classId, file);
  try {
    if (fs.existsSync(filePath)) {
      const studentData = fs.readFileSync(filePath, 'utf8').split('\n').filter(line => line).map(line => {
        const [lastName, firstName, id, email] = line.split(' ');
        return { lastName, firstName, id, email };
      });
      res.json(studentData);
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving student information');
  }
});

// Add a Student to a File
router.post('/file/:classId/:file/student', (req, res) => {
  const { classId, file } = req.params;
  const newStudent = req.body;
  const filePath = path.join(SERVER_DIRECTORY, classId, file);
  try {
    if (fs.existsSync(filePath)) {
      const studentLine = `${newStudent.lastName} ${newStudent.firstName} ${newStudent.id} ${newStudent.email}`;
      fs.appendFileSync(filePath, `\n${studentLine}`);
      res.status(201).send('Student added');
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    res.status(500).send('Error adding student');
  }
});

// Remove a Student from a File
router.delete('/file/:classId/:fileName/student/:studentId', (req, res) => {
  const { classId, fileName, studentId } = req.params;

  // Ensure the file name ends with '.text'
  const normalizedFileName = fileName.endsWith('.text') ? fileName : `${fileName}.text`;
  const filePath = path.join(SERVER_DIRECTORY, classId, normalizedFileName);

  console.log('--- DELETE REQUEST START ---');
  console.log('Received parameters:', { classId, fileName, studentId });
  console.log('Normalized file name:', normalizedFileName);
  console.log('Generated file path:', filePath);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return res.status(404).send('File not found');
  }

  try {
    // Read and parse the student data from the file
    let studentData = fs.readFileSync(filePath, 'utf8').split('\n').filter(line => line.trim());
    console.log('File found. Initial student data:', studentData);

    const initialLength = studentData.length;

    // Filter out the student by their ID
    studentData = studentData.filter(line => {
      const parts = line.trim().split(/\s+/); 
      if (parts.length < 4) {
        console.error('Malformed line detected, skipping:', line);
        return true;
      }
      const [, , id] = parts;
      console.log('Comparing Student IDs:', id.trim(), studentId.trim());
      return id.trim() !== studentId.trim();
    });

    // Check if the student was actually removed
    if (studentData.length === initialLength) {
      console.error('Student not found for deletion:', studentId);
      return res.status(404).send('Student not found');
    }

    // Write the updated student data back to the file
    fs.writeFileSync(filePath, studentData.join('\n'), 'utf8');
    console.log('Student deleted successfully');
    res.send('Student deleted successfully');
  } catch (error) {
    console.error('Error while processing student deletion:', error);
    res.status(500).send('Error deleting student');
  }
  console.log('--- DELETE REQUEST END ---');
});



// Edit a Student in a File
router.put('/file/:classId/:file/student/:studentId', (req, res) => {
  const { classId, file, studentId } = req.params;
  const updatedStudent = req.body;
  const filePath = path.join(SERVER_DIRECTORY, classId, file);
  try {
    if (fs.existsSync(filePath)) {
      let studentData = fs.readFileSync(filePath, 'utf8').split('\n').filter(line => line);
      studentData = studentData.map(line => {
        if (line.includes(studentId)) {
          return `${updatedStudent.lastName} ${updatedStudent.firstName} ${updatedStudent.id} ${updatedStudent.email}`;
        }
        return line;
      });
      fs.writeFileSync(filePath, studentData.join('\n'));
      res.status(200).send('Student updated');
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    res.status(500).send('Error updating student');
  }
});

router.get('/search', (req, res) => {
  const query = req.query.query ? req.query.query.toLowerCase() : '';
  let results = [];

  try {
    console.log('Search query:', query);

    if (!query) {
      res.status(400).send('Query parameter is required');
      return;
    }

    const classDirs = fs.readdirSync(SERVER_DIRECTORY);
    classDirs.forEach(classId => {
      const files = fs.readdirSync(path.join(SERVER_DIRECTORY, classId));
      files.forEach(file => {
        if (file.endsWith('.text')) {
          const filePath = path.join(SERVER_DIRECTORY, classId, file);
          const studentData = fs.readFileSync(filePath, 'utf8').split('\n').filter(line => line);

          studentData.forEach(line => {
            const [lastName, firstName, id, email] = line.split(' ');
            console.log('Processing student:', lastName, firstName, id, email);
            if (
              lastName.toLowerCase().includes(query) ||
              firstName.toLowerCase().includes(query) ||
              id.includes(query) ||
              email.toLowerCase().includes(query)
            ) {
              results.push({ lastName, firstName, id, email, classId, file: file.replace('.text', '') });
            }
          });
        }
      });
    });

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send('No matching students found');
    }
  } catch (error) {
    console.error('Error during search:', error); 
    res.status(500).send('Error searching for student');
  }
});


// Update student information
router.put('/file/:classId/:fileName/student/:studentId', (req, res) => {
    const { classId, fileName, studentId } = req.params;
    const updatedStudent = req.body;
    const filePath = path.join(__dirname, `../data/${classId}/${fileName}`);
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading file');
      }
  
      const lines = data.split('\n');
      let found = false;
      const updatedLines = lines.map(line => {
        const [lastName, firstName, id, email] = line.split(' ');
        if (id === studentId) {
          found = true;
          return `${updatedStudent.lastName} ${updatedStudent.firstName} ${studentId} ${updatedStudent.email}`;
        }
        return line;
      });
  
      if (!found) {
        return res.status(404).send('Student not found');
      }
  
      fs.writeFile(filePath, updatedLines.join('\n'), 'utf8', (writeErr) => {
        if (writeErr) {
          return res.status(500).send('Error writing to file');
        }
        res.send('Student information updated successfully');
      });
    });
  });
  
  

module.exports = router;
