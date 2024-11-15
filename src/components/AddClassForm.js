import React, { useState } from 'react';
import axios from 'axios';

function AddClassForm() {
  const [newClassId, setNewClassId] = useState('');

  const handleAddClass = () => {
    if (newClassId.trim() === '') {
      alert('Class ID cannot be empty');
      return;
    }
    axios.post('http://localhost:5001/api/class', { classId: newClassId })
      .then(() => {
        alert('Class added successfully');
        setNewClassId('');
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert('Class already exists');
        } else {
          alert('Error adding class');
        }
      });
  };

  return (
    <div>
      <h2>Add New Class</h2>
      <input
        type="text"
        value={newClassId}
        onChange={e => setNewClassId(e.target.value)}
        placeholder="Enter new class ID"
      />
      <button onClick={handleAddClass}>Add Class</button>
    </div>
  );
}

export default AddClassForm;
