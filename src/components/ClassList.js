import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClassList() {
  const [classIds, setClassIds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/class-ids')
      .then(response => {
        const filteredClasses = response.data.filter(classId => classId !== '.DS_Store');
        setClassIds(filteredClasses);
      })
      .catch(error => {
        alert('Error fetching class IDs');
      });
  }, []);

  return (
    <div>
      <h2>Class List</h2>
      <ul>
        {classIds.map(classId => (
          <li key={classId}>{classId}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClassList;


