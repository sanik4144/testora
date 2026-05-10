"use client";

import {React, useState} from 'react'
import { Loader } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await api.post("/auth/login", form);
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        {success && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Log In Successfully</h3>
              <p>Welcome to Testora</p>

              <button
                onClick={() => setSuccess(false)}
                className="primary-btn"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Something Went Wrong</h3>
              <p className="error-msg">{error}</p>

              <button
                onClick={() => setError("")}
                className="primary-btn"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        )}


        <div className="card">
          <div className="title">Welcome to Testora</div>
          <div className="subtitle">Use one account across both Web and App</div>

          <form action="" method="post" className="form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="email" 
              id="email" 
              placeholder="Enter your email"
              value={form.email} 
              className='input'
              onChange={handleChange}
            />
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Enter your password"
              value={form.password}
              className='input'  
              onChange={handleChange}
            />

            <p className="forgot-password"><Link href="/login/forgot-password">Forgot password?</Link></p>

            <button className="primary-btn" type="submit" disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : "Log In"}
            </button>

            <div className="divider">Or continue with</div>

            <div className="social-buttons">
              <button className="social-btn" type="button">
                <span>G</span> Continue with Google
              </button>
            </div>

            <p className="login-text">
              Don&apos;t have an account? <Link href="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login