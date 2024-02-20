"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthService from "../hook/auth";
import { CiUser, CiMail, CiLock } from "react-icons/ci";

const Register = () => {
  // const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
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
  const handlePassword2 = (e) => {
    setConfirmPassword(e.target.value);
  };

  const router = useRouter();
  const handleRegister = () => {
    if (username && email && password && password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    AuthService.register(username, email, password, role, confirmPassword)
      .then(() => {
        window.alert(
          "Congratulations, your account has been successfully created."
        );
        router.replace("/user/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div className="flex w-full pt-8 justify-center">
      <div className="col-md-12 md:p-12 lg:w-[50vw] flex flex-col justify-center">
        <h1 className="text-2xl font-semibold mb-4 flex w-full justify-center">
          Create your account
        </h1>
        <p className="mb-6 flex w-full justify-center">
          Have an account?{" "}
          <span className="text-[#0048ba] underline underline-offset-1  pl-2">
            <Link href="/user/login">Log in now</Link>
          </span>
        </p>
        {message && <div className="text-red-600">{message}</div>}
        <div className="flex flex-col gap-4 grow">
          <div>
            <label
              htmlFor="username"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              Username：
            </label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <CiUser className="h-6 w-6" />
              </div>
              <input
                onChange={handleUsername}
                type="text"
                name="username"
                className="text-sm bg-transparent sm:text-base placeholder-gray-300 pl-10 pr-4 border-b border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

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
                placeholder="Must be at least 6 characters"
                className="text-sm bg-transparent sm:text-base placeholder-gray-300 pl-10 pr-4 border-b border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              Password repeat：
            </label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <CiLock className="h-6 w-6" />
              </div>
              <input
                onChange={handlePassword2}
                type="password"
                name="password"
                placeholder="Comfirm password"
                className="text-sm bg-transparent sm:text-base placeholder-gray-300 pl-10 pr-4 border-b border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              onClick={handleRegister}
              className="blackpurple text-white text-[16px] mt-2 px-8 py-2 rounded-full"
            >
              <span>Register</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
