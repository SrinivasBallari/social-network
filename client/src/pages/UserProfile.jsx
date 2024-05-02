import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

// Define interests array
const interests = [
  'Running',
  'Scuba Diving',
  'Snorkeling',
  'Cooking',
  'Biking',
  'Yoga',
  'Dancing',
  'Reading',
  'Traveling',
  'Photography',
  'Exercise',
  'Gardening',
  'Fishing',
  'Painting'
];

const UserProfile = () => {

  const { user, logout, login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleIndustryChange = (e) => {
    setSelectedIndustry(e.target.value);
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedInterests([...selectedInterests, value]);
    } else {
      setSelectedInterests(selectedInterests.filter(interest => interest !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedInterests.length < 2) {
      setError('Please select at least two interests.');
      return;
    }
    try {
      const authToken = localStorage.getItem('auth-token');
      
      await axios.put('http://localhost:8000/api/v1/user-profile/update', {
        username,
        industry: selectedIndustry,
        interests: selectedInterests
      },{
        headers: {
          'auth-token': authToken
        }
      });
      setUsername('');
      setSelectedIndustry('');
      setSelectedInterests([]);
      alert("successfully updated");
      navigate('/file-upload');
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <>
      {user && <div className="w-full h-screen flex-col items-center bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white rounded-xl shadow-xl px-8 py-6 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Update User Profile</h2>
          <input
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none"
            required
          />
          <select
            name="industry"
            value={selectedIndustry}
            onChange={handleIndustryChange}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none"
            required
          >
            <option value="">Choose your Industry</option>
            <option value="Finance">Finance</option>
            <option value="Advertising">Advertising</option>
            <option value="Software Technology">Software Technology</option>
            <option value="Media and Broadcasting">Media and Broadcasting</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Healthcare and Biotechnology">Healthcare and Biotechnology</option>
          </select>
          <div className="mb-4">
            <span>Choose your Interests (Select at least two):</span>
            {error && <p className="text-red-500">{error}</p>}
            {interests.map((interest, index) => (
              <label key={index} className="block">
                <input
                  type="checkbox"
                  value={interest}
                  checked={selectedInterests.includes(interest)}
                  onChange={handleInterestChange}
                  className="mr-2"
                />
                {interest}
              </label>
            ))}
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300">Update</button>
        </form>
      </div>}

    </>

  );
}

export default UserProfile;
