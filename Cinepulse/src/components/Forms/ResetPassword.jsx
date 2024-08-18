import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/ForgotResetPassword.css"; // Ensure this path is correct

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/reset-password', {
        otp,
        newPassword,
        email,
      });
      console.log('Response:', response); // Debugging line
      if (response.status === 204) {
        setError('Password reset successfully!'); // Set success message in error state
        setTimeout(() => navigate('/login'), 300); // Redirect after 2 seconds
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (err) {
      console.error('Error during reset password request:', err); // Debugging line
      if (err.response) {
        setError(`Error ${err.response.status}: ${err.response.data}`);
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('Error setting up request.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
