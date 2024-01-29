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
      // window.alert("登入成功。您現在將被重新導向到個人資料頁面。");
      setCurrentUser(AuthService.getCurrentUser());
      setAuth(true);
    } catch (e) {
      setMessage(e.response.data);
    }
  };
  const handleGoogleLogin = () => {
    const width = 500;
    const height = 500;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const redirectUri = "http://localhost:4040/latest/profile"; // 您期望重定向到的 URI

    const popupWindow = window.open(
      "http://localhost:4040/latest/user/google",
      "Google Login",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (popupWindow) {
      if (window.focus) popupWindow.focus();
      const intervalId = setInterval(async () => {
        try {
          if (popupWindow.location.href === redirectUri) {
            clearInterval(intervalId);
            popupWindow.close();
            // 現在是時候從後端獲取用戶數據了
            const response = await fetch(redirectUri);
            const userData = await response.json();
            localStorage.setItem("user", { message: "成功登入", role: "user" });
            // 更新用戶狀態
            // setCurrentUser(AuthService.getCurrentUser());
            // setAuth(true);
          }
        } catch (e) {
          // 忽略跨域錯誤
        }
        if (popupWindow.closed) {
          clearInterval(intervalId);
          // 可能需要處理彈出窗口被用戶手動關閉的情況
        }
      }, 500);
    } else {
      console.error(
        "Unable to open the login popup window, it may have been blocked by the browser."
      );
    }
  };

  if (auth == true) {
    window.location.href = "/profile";
  }

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-primary blackpurple text-white px-3 py-1 rounded-full"
      >
        <span>Google</span>
      </button>
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="form-group">
          <label htmlFor="username">電子信箱：</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
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
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
