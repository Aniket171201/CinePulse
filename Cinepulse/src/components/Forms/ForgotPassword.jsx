import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/ForgotResetPassword.css"; // Ensure this path is correct

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Navigate immediately, assuming the email is valid
      navigate('/reset-password'); 
      
      // Optionally send the request in the background
      axios.post('http://localhost:8080/api/users/forgot-password', { email })
        .catch(err => {
          console.error('Error during forgot password request:', err);
          setError('Failed to send OTP. Please try again.');
        });
    } catch (err) {
      console.error('Error during forgot password request:', err);
      setError('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
