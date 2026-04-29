const express = require('express')
const mongoose = require('mongoose')
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

    return res.status(200).json({
      success: true,
      message: "All users",
      user: users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch users",
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


module.exports = { getAllUsers, deleteOneUser };