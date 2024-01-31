"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import AuthService from "../hook/auth";

const Login = ({ currentUser, setCurrentUser }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  let [auth, setAuth] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(AuthService.getCurrentUser());
      setAuth(true);
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  const handleGoogleLogin = async () => {
    const width = 500;
    const height = 500;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popupWindow = window.open(
      "http://localhost:4040/latest/user/google",
      "Google Login",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (window.focus) {
      popupWindow.focus();
      localStorage.setItem("login", "in process")
    }

    const timer = setInterval(async () => {
      try {
        if (popupWindow.closed && localStorage.getItem("login") == "in process") {
          clearInterval(timer);
          await AuthService.googleLoginSuccess();
          setCurrentUser(AuthService.getCurrentUser());
          localStorage.removeItem("login")
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  };


  if (localStorage.getItem("user") !== null ) {
    window.location.href = "/profile/account";
  }

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">

      <button 
        onClick={handleGoogleLogin}
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
      >
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
        <span>Login with Google</span>
      </button>

      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="form-group">
          <label htmlFor="username">Email：</label>
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
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
