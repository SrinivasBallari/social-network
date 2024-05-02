import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';


const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const { user, logout, login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const authToken = localStorage.getItem('auth-token');
      if (!authToken) {
        return;
      }
      
      const response = await axios.post(
        'http://localhost:8000/api/v1/user-profile/upload/bank-statements', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': authToken
          }
        }
      );

      console.log('Upload successful:', response.data);
      setUploadSuccess(true);
      alert('upload success');
      navigate('/main-page');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Error uploading file. Please try again later.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
    {user && <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">File Upload</h2>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none"
      />
      <button 
        onClick={handleUpload} 
        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadSuccess && <p className="text-green-500 mt-2">File uploaded successfully!</p>}
      {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
    </div>}
    
    </>
    
  );
}

export default FileUpload;
