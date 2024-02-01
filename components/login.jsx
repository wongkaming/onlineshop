"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useHistory } from "react-router-dom";
import AuthService from "../hook/auth";
import { CiMail, CiLock } from "react-icons/ci";

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
      localStorage.setItem("login", "in process");
    }

    const timer = setInterval(async () => {
      try {
        if (
          popupWindow.closed &&
          localStorage.getItem("login") == "in process"
        ) {
          clearInterval(timer);
          await AuthService.googleLoginSuccess();
          setCurrentUser(AuthService.getCurrentUser());
          localStorage.removeItem("login");
        }
        if (localStorage.getItem("user") !== null) {
          window.location.href = "/user/account";
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);    
  };

  return (
    <div className="col-md-12 md:p-12 p-5">
      <h1 className="text-2xl font-semibold mb-4">Log in to your account</h1>
      <p>
        Don't have an account?{" "}
        <span className="text-[#0048ba] underline underline-offset-1">
          <Link href="/user/register">Sign Up</Link>
        </span>
      </p>
      <button
        onClick={handleGoogleLogin}
        className="my-4 px-4 py-2 border flex gap-2 bg-white border-gray-400 shadow-sm dark:border-slate-700 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md transition duration-150"
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Google</span>
      </button>
      <div className="relative my-6 h-px bg-gray-300">
        <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
          <span className="bg-gray-50 px-4 text-xs text-gray-500 uppercase">
            Or Login With Email
          </span>
        </div>
      </div>
      {message && <div className="text-red-600">{message}</div>}
      <div className="flex flex-col gap-4 grow">
        <div>
          <label
            htmlFor="email"
            className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >
            Email：
          </label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <CiMail className="h-6 w-6" />
            </div>
            <input
              onChange={handleEmail}
              type="email"
              name="email"
              className="text-sm bg-transparent sm:text-base placeholder-gray-300 pl-10 pr-4 border-b border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >
            Password：
          </label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <CiLock className="h-6 w-6" />
            </div>
            <input
              onChange={handlePassword}
              type="password"
              name="password"
              className="text-sm bg-transparent sm:text-base placeholder-gray-300 pl-10 pr-4 border-b border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <button
            onClick={handleLogin}
            className="blackpurple text-white text-[16px] mt-2 px-8 py-2 rounded-full"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
