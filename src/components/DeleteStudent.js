import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteStudent() {
  const [classId, setClassId] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileOptions, setFileOptions] = useState([]);
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    if (classId.trim() !== '') {
      axios.get(`http://localhost:5001/api/class/${classId}/files`)
        .then(response => {
          const filteredFiles = response.data.filter(file => !file.startsWith('.'));
          setFileOptions(filteredFiles);
        })
        .catch(error => {
          console.error('Error fetching file options:', error);
        });
    }
  }, [classId]);

  const handleDeleteStudent = () => {
    const trimmedClassId = classId.trim();
    let trimmedFileName = fileName.trim();
    const trimmedStudentId = studentId.trim();
  
    if (trimmedClassId === '' || trimmedFileName === '' || trimmedStudentId === '') {
      alert('Class ID, File Name, and Student ID cannot be empty');
      return;
    }
  
    if (!trimmedFileName.endsWith('.text')) {
      trimmedFileName += '.text';
    }
  
    console.log('Deleting student with:', { trimmedClassId, trimmedFileName, trimmedStudentId });
  
    axios.delete(`http://localhost:5001/api/file/${trimmedClassId}/${trimmedFileName}/student/${trimmedStudentId}`)
      .then(() => {
        alert('Student deleted successfully');
        setClassId('');
        setFileName('');
        setStudentId('');
      })
      .catch(error => {
        console.error('Error deleting student:', error);
        if (error.response && error.response.status === 404) {
          alert('Student or file not found');
        } else {
          alert('Error deleting student');
        }
      });
  };
  

  return (
    <div>
      <h2>Delete Student</h2>
      <div>
        <label htmlFor="classId">Class ID:</label>
        <input
          id="classId"
          type="text"
          value={classId}
          onChange={e => setClassId(e.target.value)}
          placeholder="Enter class ID"
          list="class-options"
        />
        <datalist id="class-options">
          {fileOptions.map(option => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="fileName">File Name:</label>
        <input
          id="fileName"
          type="text"
          value={fileName}
          onChange={e => setFileName(e.target.value)}
          placeholder="Enter file name"
        />
      </div>
      <div>
        <label htmlFor="studentId">Student ID:</label>
        <input
          id="studentId"
          type="text"
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
          placeholder="Enter student ID"
        />
      </div>
      <button onClick={handleDeleteStudent}>Delete Student</button>
    </div>
  );
}

export default DeleteStudent;
