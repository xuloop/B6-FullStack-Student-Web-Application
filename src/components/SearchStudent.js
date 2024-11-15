import React, { useState } from 'react';
import axios from 'axios';

function SearchStudent() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (query.trim() === '') {
      alert('Search query cannot be empty');
      return;
    }
    axios.get(`http://localhost:5001/api/search?query=${query}`)
      .then(response => {
        const updatedResults = response.data.map(student => {
          return {
            ...student,
            classId: student.classId,
            file: student.file.replace('.text', '')
          };
        });
        setSearchResults(updatedResults);
      })
      .catch(error => {
        alert('Error searching for student');
      });
  };

  return (
    <div>
      <h2>Search for a Student</h2>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter student name, ID, or email"
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((student, index) => (
              <li key={index}>
                {student.lastName}, {student.firstName} - {student.id} ({student.email}) - Class: {student.classId}, Semester: {student.file}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchStudent;

