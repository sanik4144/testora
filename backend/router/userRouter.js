const express = require('express');
const router = express.Router();

const { getAllUsers, deleteOneUser } = require('../controller/userController');

router.get('/all', getAllUsers)
router.delete('/delete/:id', deleteOneUser);

module.exports = router;