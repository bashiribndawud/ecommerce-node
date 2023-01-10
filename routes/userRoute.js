const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const {register, login} = require('../controllers/user');

router.post("/signup", register);
router.post("/signin", login);


module.exports = router;