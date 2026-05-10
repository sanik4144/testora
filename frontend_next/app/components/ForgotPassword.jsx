"use client";

import Link from 'next/link';
import { React, useState } from 'react'
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle forgot password logic here
  }

  return (
    <div className='container'>
      <div className="card">
        <h1 className='title'>Forgot Password</h1>
        <p className='subtitle'>Please contact support to reset your password.</p>
        <form action="" className="form">
          <input 
            type="text" 
            name="" 
            id="" 
            placeholder='your@email.com'
            className='input'
          />  

          <button className="primary-btn" type="submit">Continue</button>

          <Link href="/login" className="secondary-btn">
            <ArrowLeft />
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword