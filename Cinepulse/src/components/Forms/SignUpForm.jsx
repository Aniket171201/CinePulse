// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../../styles/SignUpForm.css";

// const SignUpForm = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [reenterPassword, setReenterPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignUpSubmit = (e) => {
//     e.preventDefault();
//     if (password !== reenterPassword) {
//       setError("Passwords do not match.");
//       return;
//     }
//     // Handle sign-up logic here
//     setError("");
//     alert("Sign-up successful!");
//   };

//   return (
//     <div className="login-form">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSignUpSubmit}>
//         <input
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           placeholder="First Name"
//           required
//         />
//         <input
//           type="text"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           placeholder="Last Name"
//           required
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="tel"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//           placeholder="Mobile Number"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <input
//           type="password"
//           value={reenterPassword}
//           onChange={(e) => setReenterPassword(e.target.value)}
//           placeholder="Re-enter Password"
//           required
//         />
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit">Sign Up</button>
//       </form>
//       <div className="login-form-footer">
//         <Link to="/login">Back to Sign In</Link>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../../styles/SignUpForm.css";

// const SignUpForm = () => {
//   const [name, setName] = useState("");
//   const [lname, setLname] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("USER"); // Assuming role selection is done via dropdown or similar
//   const [error, setError] = useState("");

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault();
//     const userData = { name, lname, username, email, password, role };
//     console.log(userData);
    

//     try {
//       const response = await fetch("http://localhost:8080/api/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         alert("Sign-up successful!");
//         // Optionally, clear the form or redirect the user
//         setName("");
//         setLname("");
//         setUsername("");
//         setEmail("");
//         setPassword("");
//         setRole("");
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Sign-up failed.");
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="login-form">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSignUpSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="First Name"
//           required
//         />
//         <input
//           type="text"
//           value={lname}
//           onChange={(e) => setLname(e.target.value)}
//           placeholder="Last Name"
//           required
//         />
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit">Sign Up</button>
//       </form>
//       <div className="login-form-footer">
//         <Link to="/login">Back to Sign In</Link>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/SignUpForm.css";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState(""); // New state for password error
  const navigate = useNavigate();

  // Password validation regex
  const passwordValidationRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccessMessage("");
    setPasswordError("");

    // Validate password
    if (!passwordValidationRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include one uppercase letter, one number, and one special character."
      );
      return;
    }

    const userData = { name, lname, username, email, password, role };

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccessMessage("Sign-up successful! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 300);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Sign-up failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUpSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {passwordError && (
            <p className="password-error-message">{passwordError}</p>
          )}
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-form-footer">
          <Link to="/login">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
