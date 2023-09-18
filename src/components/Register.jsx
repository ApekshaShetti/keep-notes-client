// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { api } from "../utils/axios";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const { data } = await api.post("/myquicknotes/register/", {
//         username,
//         password,
//         email,
//       });
//       localStorage.setItem("user", JSON.stringify(data));
//       navigate("/");
//       // Registration successful
//     } catch (error) {
//       console.log(error);
//       // Handle registration error
//     }
//   };

//   return (
//     <div className="register-form">
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={handleRegister}>Register</button>
//       <div>
//         Already have an account? <Link to={"/login"}>Login</Link>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Clear any previous error messages
    setError(null);

    // Perform client-side validation
    if (!username || !password || !email) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      const { data } = await api.post("/myquicknotes/register/", {
        username,
        password,
        email,
      });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
      // Registration successful
    } catch (error) {
      console.log(error);
      // Handle registration error
      if (error.response) {
        // Server responded with an error status code
        if (error.response.status === 400) {
          setError("Please choose a strong password.");
        } else if (error.response.status === 409) {
          setError(
            "Username or email already exists. Please choose a different one."
          );
        } else {
          setError("Registration failed. Please try again later.");
        }
      } else {
        setError("Network error. Please check your internet connection.");
      }
    }
  };

  return (
    <div className="register-form">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister}>Register</button>
      <div>
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Register;
