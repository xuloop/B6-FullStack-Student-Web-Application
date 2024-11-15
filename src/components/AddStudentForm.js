import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddStudentForm() {
  const [classId, setClassId] = useState('');
  const [fileName, setFileName] = useState('');
  const [student, setStudent] = useState({ lastName: '', firstName: '', id: '', email: '' });
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

  const handleAddStudent = () => {
    if (classId.trim() === '' || fileName.trim() === '' || Object.values(student).some(value => value.trim() === '')) {
      alert('All fields must be filled out');
      return;
    }
    axios.post(`http://localhost:5001/api/file/${classId}/${fileName}/student`, student)
      .then(() => {
        alert('Student added successfully');
        setClassId('');
        setFileName('');
        setStudent({ lastName: '', firstName: '', id: '', email: '' });
      })
      .catch(error => {
        alert('Error adding student');
      });
  };

  return (
    <div>
      <h2>Add New Student</h2>
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
      <input
        type="text"
        value={student.lastName}
        onChange={e => setStudent({ ...student, lastName: e.target.value })}
        placeholder="Enter student's last name"
      />
      <input
        type="text"
        value={student.firstName}
        onChange={e => setStudent({ ...student, firstName: e.target.value })}
        placeholder="Enter student's first name"
      />
      <input
        type="text"
        value={student.id}
        onChange={e => setStudent({ ...student, id: e.target.value })}
        placeholder="Enter student ID"
      />
      <input
        type="text"
        value={student.email}
        onChange={e => setStudent({ ...student, email: e.target.value })}
        placeholder="Enter student email"
      />
      <button onClick={handleAddStudent}>Add Student</button>
    </div>
  );
}

export default AddStudentForm;
