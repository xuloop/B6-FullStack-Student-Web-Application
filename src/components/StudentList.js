import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentList() {
  const [classId, setClassId] = useState('');
  const [fileName, setFileName] = useState('');
  const [students, setStudents] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/class-options')
      .then(response => {
        setClassOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching class options:', error);
      });
  }, []);

  const handleGetStudents = () => {
    if (classId.trim() === '' || fileName.trim() === '') {
      alert('Class ID and File Name cannot be empty');
      return;
    }
    axios.get(`http://localhost:5001/api/file/${classId}/${fileName}`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        alert('Error fetching students');
      });
  };

  return (
    <div>
      <h2>Get Students in File</h2>
      <input
        type="text"
        value={classId}
        onChange={e => setClassId(e.target.value)}
        placeholder="Enter class ID"
        list="class-options"
      />
      <datalist id="class-options">
        {classOptions.map(option => (
          <option key={option} value={option} />
        ))}
      </datalist>
      <input
        type="text"
        value={fileName}
        onChange={e => setFileName(e.target.value)}
        placeholder="Enter file name"
      />
      <button onClick={handleGetStudents}>Get Students</button>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.lastName}, {student.firstName} - {student.id} ({student.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
