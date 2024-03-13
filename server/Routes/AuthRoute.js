const express = require("express");

const { loginUser, registeruser } = require('../Controllers/AuthController');

const router = express.Router()


router.post('/register',registeruser)
router.post('/login',loginUser)

module.exports = router;
