import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
    const [question, setQuestion] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const { user, logout, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setUploading(true);

            // Make an Axios POST request to ask the question
            const authToken = localStorage.getItem('auth-token');
            if (!authToken) {
                // Handle the case where the token is not available
                return;
            }

            const response = await axios.post(
                'http://localhost:8000/api/v1/questions/ask',
                { question },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': authToken
                    }
                }
            );

            console.log('Question asked successfully:', response.data);
            setUploadSuccess(true);
            alert('posted question successfully');
            navigate('/main-page');
        } catch (error) {
            console.error('Error asking question:', error);
            setUploadError('Error asking question. Please try again later.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            {user && <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
                <form onSubmit={handleSubmit} className="mb-8">
                    <textarea
                        value={question}
                        onChange={handleQuestionChange}
                        placeholder="Type your question here"
                        className="border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none w-full"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                        disabled={uploading}
                    >
                        {uploading ? 'Asking...' : 'Ask Question'}
                    </button>
                </form>
                {uploadSuccess && <p className="text-green-500 mt-2">Question asked successfully!</p>}
                {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
            </div>
            }
        </>
    );
}

export default AskQuestion;
