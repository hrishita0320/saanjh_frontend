import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const handleValueChange = (event) => {
    const role = event.target.value;
    setUserRole(role);
  };

  const handleLogin = () => {
    if (userRole === "Doctor" || userRole === "Caretaker") {
      // Store the user role in localStorage
      localStorage.setItem('userRole', userRole);
      
      // Navigate to the appropriate page
      if (userRole === "Doctor") {
        navigate("/Doctors");
      } else {
        navigate("/Caretakers");
      }
    } else {
      alert("Please select a role before logging in.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Saanjh Sahayak</h1>
          <p>Your Healthcare Companion</p>
        </div>
        <div className="login-body">
          <h2>Welcome Back</h2>
          <p>Please select your role to continue</p>
          <div className="role-selector">
            <select value={userRole} onChange={handleValueChange}>
              <option value="" disabled>Choose your role</option>
              <option value="Doctor">Doctor</option>
              <option value="Caretaker">Caretaker</option>
            </select>
          </div>
          <button 
            className={`login-button ${userRole ? 'active' : ''}`}
            onClick={handleLogin}
            disabled={!userRole}
          >
            Login
          </button>
        </div>
        <div className="login-footer">
          <p>Need help? Contact support</p>
        </div>
      </div>
      <div className="background-design">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>
    </div>
  );
};

export default Login;