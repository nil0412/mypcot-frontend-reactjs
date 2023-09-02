import React, { useState, useEffect } from 'react';

function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the list of records from your backend when the component mounts
    fetch('http://localhost:8000/api/records')
      .then((response) => {
        if (response.status === 401) {
          // Redirect the user to the login page
          window.location.href = '/login';
        }
        return response.json()})
      .then((data) => setRecords(data))
      .catch((error) => console.error('Error fetching records:', error));
  }, []);

  return (
    <div>
      <h2>Record List</h2>
      <ul>
        {records.map((record) => (
          <li key={record._id}>
            <p>Name: {record.name}</p>
            <p>Description: {record.description}</p>
            <p>Category: {record.category}</p>
            <p>Active: {record.active ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecordList;
