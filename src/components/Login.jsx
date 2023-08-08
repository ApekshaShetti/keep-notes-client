import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
