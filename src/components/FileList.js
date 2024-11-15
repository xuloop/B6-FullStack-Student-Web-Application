import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileList() {
  const [classId, setClassId] = useState('');
  const [files, setFiles] = useState([]);
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

  const handleGetFiles = () => {
    if (classId.trim() === '') {
      alert('Class ID cannot be empty');
      return;
    }
    axios.get(`http://localhost:5001/api/class/${classId}/files`)
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        alert('Error fetching files');
      });
  };

  return (
    <div>
      <h2>View Files in Class</h2>
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
      <button onClick={handleGetFiles}>Get Files</button>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
