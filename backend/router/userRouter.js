const express = require('express');
const router = express.Router();

const { getAllUsers, getOneUser, updateOneUser, deleteOneUser } = require('../controller/userController');
const { updatePassword } = require('../controller/authController');

router.get('/all', getAllUsers);
router.get('/:id', getOneUser);

router.put('/update/:id', updateOneUser);
router.put('/updatepassword/:id', updatePassword);

router.delete('/delete/:id', deleteOneUser);

module.exports = router;