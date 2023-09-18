import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/myquicknotes/login/", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      // Registration successful
      navigate("/");
    } catch (error) {
      // // Handle registration error
      // console.log(error);
      // // Handle registration error
      // if (error.response) {
      //   // Server responded with an error status code
      //   if (error.response.status === 400) {
      //     setError("Please choose a strong password.");
      //   } else if (error.response.status === 409) {
      //     setError(
      //       "Username or email already exists. Please choose a different one."
      //     );
      //   } else {
      //     setError("Login failed. Please try again later.");
      //   }
      // } else {
      //   setError("Network error. Please check your internet connection.");
      // }

      switch (error?.response?.status) {
        case 401:
          setError("Please enter a valid password.");
          break;
        case 409:
          setError("Please enter a valid email address.");
          break;
        default:
          setError("Something went wrong. Please try again.");
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
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <div>
        Don&apos;t have an account? <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
