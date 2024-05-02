import React, { useState } from "react";
import register from "../assets/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const saveToken = (token) => {
    localStorage.setItem('auth-token', token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', {
        email,
        password
      });
      if (response.data.message == 'user logged in successfully') {
        saveToken(response.data.token);
        login(response.data.user);
        console.log(response);
        alert("logged in, please update profile info:")
        navigate('/user-profile');
      }
    } catch (error) {
      console.log(error);
      alert(error)
    }
  }

  return (
    <div className="w-full h-full  bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center ">
      <div className="flex  px-20 mt-24 mb-6 w-[980px] items-center gap-x-6 justify-between rounded-xl h-screen bg-white shadow-xl  max-[768px]:mx-2 ">
        <form
          className="input-container mb-12 w-1/2 h-1/2 flex flex-col gap-y-3 max-[768px]:w-full"
          onSubmit={handleSubmit}
        >
          <span className="text-center font-medium text-2xl">Login</span>

          <div>
            <input
              type="email"
              name="email"
              id=""
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border py-1 px-2 mt-2 rounded-md w-2/3"
            />
          </div>
          <div>

            <input
              type="password"
              name="password"
              id=""
              placeholder="Paasword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none border py-1 px-2 mt-2 rounded-md w-2/3"
            />
          </div>
          <button className="w-fit border py-2 rounded-md bg-blue-600 shadow-xl text-white px-5">
            Login
          </button>

          <h3 className="font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="underline text-blue-600 ">
              Register
            </Link>
          </h3>
        </form>
        <div className="max-[768px]:hidden">
          <img src={register} alt="register-image" width={350} height={350} />
        </div>
      </div>
    </div>
  );
}

export default Login