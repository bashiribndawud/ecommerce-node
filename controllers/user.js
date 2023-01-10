const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
dotenv.config()
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validator");
const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ err: "Please provide all field" });
  }
  if (!validateName(username)) {
    return res.status(400).json({ err: "Invalid name" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ err: "Invalid Email" });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ err: "Invalid Password" });
  }

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return res.status(403).json({ err: "Email already taken(user exist)" });
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, (saltOrRound = 10)),
  });

  try {
    const savedUser = await newUser.save();
    return res.status(200).json(savedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
 try {
     const { email, password } = req.body;
     if (!email || !password) {
       return res.status(400).json({ err: "Please fill all fields" });
     }
     
     const isUserExist = await User.findOne({ email });
     if (!isUserExist) {
       return res.status(404).json({ err: "User not found" });
     }
     
     const isPasswordCorrect = await bcrypt.compare(
       password,
       isUserExist.password
     );
     
     if (!isPasswordCorrect) {
       return res.status(400).json({ err: "Incorrect Email or Password" });
     }

     const payload = { user: { id: isUserExist.id } };
     
     console.log(process.env.SECRET)
     const bearerToken = await jwt.sign(payload, process.env.SECRET, {
       expiresIn: 360000,
     });
     res.cookie("token", bearerToken, { expire: new Date() + 9999 });
     const { password: userpassword, ...others } = isUserExist._doc
     return res.status(200).json({
       msg: "User logged In",
       token: `bearer ${bearerToken}`,
       ...others,
     });
 } catch (error) {
    return res.status(500).json({ err: error.message });
 }
  
};

module.exports = { register, login };
