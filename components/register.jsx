"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "../hook/auth";

const Register = () => {
  // const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let role = "user";
  let [message, setMessage] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const router = useRouter();
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("註冊成功。您現在將被導向到登入頁面");
        router.replace("/user/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">Username：</label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email：</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password：</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        <button
          onClick={handleRegister}
          className="btn btn-primary blackpurple text-white px-3 py-1 rounded-full"
        >
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
