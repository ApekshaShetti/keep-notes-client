import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
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
    }
  };

  return (
    <div className="register-form">
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
