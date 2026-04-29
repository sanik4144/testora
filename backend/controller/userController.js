const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../schemas/User')

const getAllUsers = async (req, res)=>{
  try {
    const users = await User.find();
    
    if(users.length === 0){
      return res.status(404).json({
        success: true,
        message: "No users found"
      })
    }

    const filteredUser = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      role: user.role
    }))

    return res.status(200).json({
      success: true,
      message: "All users",
      user: filteredUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message
    })
  }
}

const getOneUser = async (req, res)=>{
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({
        success: true,
        message: "No users found"
      })
    }

    const filteredUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      role: user.role
    };

    return res.status(200).json({
      success: true,
      message: "Fetching user successfull",
      user: filteredUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    })
  }
}

const updateOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, city } = req.body;

    const updateInfo = await User.updateOne({_id: userId},
      {$set: {
        name: name,
        city: city,
      }}
    );

    if(updateInfo.matchedCount === 0){
      return res.status(404).json({
        success: true,
        message: "No users found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Updating user successfull",
      user: updateInfo
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Updation Failed",
      error: error.message
    })
  }
}

const deleteOneUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete",
      error: error.message
    });
  }
};


module.exports = { getAllUsers, getOneUser, updateOneUser, deleteOneUser };