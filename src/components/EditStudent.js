import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditStudent() {
    const [classId, setClassId] = useState('');
    const [fileName, setFileName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [student, setStudent] = useState({ lastName: '', firstName: '', email: '' });
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
  
    const handleEditStudent = () => {
      if (classId.trim() === '' || fileName.trim() === '' || studentId.trim() === '' || Object.values(student).some(value => value.trim() === '')) {
        alert('All fields must be filled out');
        return;
      }
      const updatedStudent = {
        ...student,
        id: studentId 
      };
    
      axios.put(`http://localhost:5001/api/file/${classId}/${fileName}/student/${studentId}`, updatedStudent)
        .then(() => {
          alert('Student information updated successfully');
          setClassId('');
          setFileName('');
          setStudentId('');
          setStudent({ lastName: '', firstName: '', email: '' });
        })
        .catch(error => {
          alert('Error updating student information');
        });
    };
  
    return (
      <div>
      <h2>Edit Student Information</h2>
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
        list="file-options"
      />
      <input
        type="text"
        value={studentId}
        onChange={e => setStudentId(e.target.value)}
        placeholder="Enter student ID"
      />

      {/* Moved to next line */}
      <div>
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
          value={student.email}
          onChange={e => setStudent({ ...student, email: e.target.value })}
          placeholder="Enter student email"
        />
      </div>

      <button onClick={handleEditStudent}>Edit Student</button>
    </div>
    );
  }
  
  export default EditStudent;
  