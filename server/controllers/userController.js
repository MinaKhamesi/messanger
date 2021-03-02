const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { assignToken } = require('../utils/token');
const User = require('../models/User');

// @route    POST /users/register
// @des      register a new user
// @access   public
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    name, email, password, image,
  } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error('user already exist');
  }

  const newUser = new User({
    name, email, password, image,
  });
  await newUser.save();

  const token = assignToken(newUser.id);

  res.cookie('authToken', token, {
    maxAge: 3600,
    httpOnly: true,
  });
  res.status(201).json({ msg: 'register successful' });
});

// @route    POST /users/login
// @des      Login a user
// @access   public
const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('Invalid email or password');
  }
  const matched = await bcrypt.compare(password, user.password);

  if (matched) {
    const token = assignToken(user.id);
    res.cookie('authToken', token, {
      maxAge: 3600,
      httpOnly: true,
    });
    res.status(200).json({ msg: 'login successful' });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @route    GET /users/auth
// @des      authenticate user
// @access   private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found!');
  }
  res.status(200).json({ user });
});

// @route    GET /users/
// @des      fetching all users
// @access   Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({ users });
});

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
};
