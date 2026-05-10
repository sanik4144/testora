const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../schemas/User');


const registerUser = async (req, res)=>{
  try {
    const {name, email, city, password, role, agreedToTerms} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const duplicateEmail = await User.findOne({email: email});

    if(duplicateEmail){
        return res.status(409).json({
          success: false,
          message: "Account with this email already exists",
      })
    }

    const newUser = await User.create({
      name, email, city, password: hashedPassword, role, agreedToTerms
    })

    return res.status(201).json({
      success: true,
      message: "Registration Successfull",
      user: newUser
    })
  } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to Register",
        error: error.message
      })
  }
}

const loginUser = async (req, res)=>{
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email: email})
    
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword){
      return res.status(401).json({
        success: false,
        message: "Wrong Password"
      })
    }

    const filteredUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      role: user.role
    };

    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      role: user.role
    }, process.env.JWT_SECRET, {expiresIn: '7d'});

    return res.status(200).json({
      success: true,
      message: "Log in successfull",
      user: filteredUser,
      token: token
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Log In Failed",
      error: error.message
    })
  }
}

const updatePassword = async (req, res)=>{
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({_id: userId});
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const matchPassword = await bcrypt.compare(oldPassword, user.password);
    if(!matchPassword){
      return res.status(401).json({
        success: false,
        message: "Wrong Password"
      })
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    await User.updateOne({_id: userId},
      {$set:{
        password: hashedNewPassword
      }}
    )

    return res.status(200).json({
      success: true,
      message: "Password updated successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Updating password failed",
      error: error.message
    })
  }
}


module.exports = {registerUser, loginUser, updatePassword};