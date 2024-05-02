import React, { useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const { user, logout, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('text', text);
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const authToken = localStorage.getItem('auth-token');
      if (!authToken) {
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/v1/posts/create-post',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': authToken
          }
        }
      );

      console.log('Post created successfully:', response.data);
      setUploadSuccess(true);
      alert("success fully posted");
      navigate('/main-page');
      
    } catch (error) {
      console.error('Error creating post:', error);
      setUploadError('Error creating post. Please try again later.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
    {user && <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your post content"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none w-full"
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none"
          multiple 
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          disabled={uploading}
        >
          {uploading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
      {uploadSuccess && <p className="text-green-500 mt-2">Post created successfully!</p>}
      {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
    </div>
}
    </>
      );
}

export default CreatePost;
