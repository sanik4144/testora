"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader } from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    c_password: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!form.agreedToTerms) {
        setError("Please accept the terms");
        return;
      }

      if (form.password !== form.c_password) {
        setError("Passwords do not match");
        return;
      }

      await api.post("/auth/register", form);
      setSuccess(true);

      router.push("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Sign Up Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {success && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Account Created Successfully</h3>
            <p>Your Testora account has been created.</p>

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
        <h2 className="title">Create your Testora account</h2>
        <p className="subtitle">Use one account across both Web and App</p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input"
          />

          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />

          <select
            className="input"
            name="city"
            value={form.city}
            onChange={handleChange}
          >
            <option value="">City</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chittagong">Chittagong</option>
            <option value="Sylhet">Sylhet</option>
          </select>

          <input
            type="password"
            placeholder="Create a password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="input"
          />

          <input
            type="password"
            placeholder="Confirm your password"
            name="c_password"
            value={form.c_password}
            onChange={handleChange}
            className="input"
          />

          <div className="checkbox">
            <input
              id="terms"
              type="checkbox"
              name="agreedToTerms"
              checked={form.agreedToTerms}
              onChange={handleChange}
            />
            <label htmlFor="terms">
              I agree to the <Link href="/terms">Terms of Service</Link> and{" "}
              <Link href="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Sign Up"}
          </button>
        </form>

        <div className="divider">Or continue with</div>

        <div className="social-buttons">
          <button className="social-btn" type="button">
            <span>G</span> Continue with Google
          </button>
        </div>

        <p className="login-text">
          Already have an account? <Link href="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
