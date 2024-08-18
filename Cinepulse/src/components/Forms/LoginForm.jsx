// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../styles/LoginForm.css";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Clear previous error messages
//     setError("");

//     if (!username || !password) {
//       setError("Please enter both username and password.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({ username, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem("token", data.token);
//         console.log(data.token);
//         localStorage.setItem("user", JSON.stringify(data.user.username));
//         console.log(data.user.username);
//        // localStorage.setItem("user", JSON.stringify(data.user));
//         navigate("/"); // Redirect to "/" after successful login
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Login failed.");
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2>Sign In</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             placeholder="Username"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Password"
//           />
//           {error && <p className="error-message">{error}</p>}
//           <button type="submit">Sign In</button>
//         </form>
//         <div className="login-form-footer">
//           <a href="/forgot-password">Forgot password?</a>
//           <p>
//             New to CinePulse? <a href="/signup">Sign up now.</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user.username));
        localStorage.setItem("userId", JSON.stringify(data.user.userId));

        // Assuming the backend response includes user roles
        console.log(data.user);
        if (data.user.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (data.user.role === "MANAGER") {
          navigate("/manager-dashboard");
        } else {
          navigate("/");
          window.location.reload();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign In</button>
        </form>
        <div className="login-form-footer">
          <a href="/forgot-password">Forgot password?</a>
          <p>
            New to CinePulse? <a href="/signup">Sign up now.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
