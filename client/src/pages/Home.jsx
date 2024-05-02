import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <div style={{ width: '300px', height: '200px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <Link to='/register' style={{ width: '100%', backgroundColor: '#3498db', color: '#fff', padding: '10px', textAlign: 'center', borderRadius: '4px', textDecoration: 'none' }}>
          Register
        </Link>
        <p>OR</p>
        <Link to='/login' style={{ width: '100%', backgroundColor: '#3498db', color: '#fff', padding: '10px', textAlign: 'center', borderRadius: '4px', textDecoration: 'none' }}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
