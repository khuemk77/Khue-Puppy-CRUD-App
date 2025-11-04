import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Body = () => {
  const [puppies, setPuppies] = useState([]);
  const [formData, setFormData] = useState({ name: '', breed: '', weight_lbs: '', vaccinated: false });

  // Fetch puppies
  const fetchPuppies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/puppies`);
      setPuppies(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPuppies();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Add new puppy
const handleAdd = async (e) => {
  e.preventDefault();

  console.log('Posting formData:', formData); // debug log

  try {
    // Convert weight_lbs to number (or null if empty)
    const payload = {
      ...formData,
      weight_lbs: formData.weight_lbs ? parseFloat(formData.weight_lbs) : null
    };

    await axios.post(`${BASE_URL}/puppies`, payload);

    // Reset form
    setFormData({ name: '', breed: '', weight_lbs: '', vaccinated: false });

    // Refresh table
    fetchPuppies();
  } catch (err) {
    console.error('Error adding puppy:', err);
  }
};


  return (
    <div style={{ padding: '20px' }}>
      <h2>Puppy List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Weight (lbs)</th>
            <th>Vaccinated</th>
          </tr>
        </thead>
        <tbody>
          {puppies.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.breed}</td>
              <td>{p.weight_lbs}</td>
              <td>{p.vaccinated ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Puppy</h3>
      <form onSubmit={handleAdd}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="breed" placeholder="Breed" value={formData.breed} onChange={handleChange} />
        <input name="weight_lbs" placeholder="Weight" type="number" value={formData.weight_lbs} onChange={handleChange} />
        <label>
          Vaccinated:
          <input name="vaccinated" type="checkbox" checked={formData.vaccinated} onChange={handleChange} />
        </label>
        <button type="submit">Add Puppy</button>
      </form>
    </div>
  );
};

export default Body;
