import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SingleRecord() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    // Fetch the single record by ID from your backend when the component mounts
    fetch(`http://localhost:8000/api/records/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Record not found.');
        }
      })
      .then((data) => setRecord(data))
      .catch((error) => console.error('Error fetching record:', error));
  }, [id]);

  if (!record) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Single Record</h2>
      <p>Name: {record.name}</p>
      <p>Description: {record.description}</p>
      <p>Category: {record.category}</p>
      <p>Active: {record.active ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default SingleRecord;
