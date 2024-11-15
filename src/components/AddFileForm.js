import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddFileForm() {
  const [classId, setClassId] = useState('');
  const [fileName, setFileName] = useState('');
  const [classOptions, setClassOptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/class-options')
      .then(response => {
        const filteredOptions = response.data.filter(option => !option.startsWith('.'));
        setClassOptions(filteredOptions);
      })
      .catch(error => {
        console.error('Error fetching class options:', error);
      });
  }, []);

  const handleAddFile = () => {
    if (classId.trim() === '' || fileName.trim() === '') {
      alert('Class ID and File Name cannot be empty');
      return;
    }
    axios.post(`http://localhost:5001/api/class/${classId}/file`, { fileName })
      .then(() => {
        alert('File added successfully');
        setClassId('');
        setFileName('');
      })
      .catch(error => {
        alert('Error adding file');
      });
  };

  return (
    <div>
      <h2>Add New File</h2>
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
      <button onClick={handleAddFile}>Add File</button>
    </div>
  );
}

export default AddFileForm;
