const asyncHandler = require('express-async-handler');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerSchema = Joi.object({
  name: Joi.string().required().trim().max(50),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().min(6),
  avatar: Joi.string().uri().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().min(6)
});

const register = asyncHandler(async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { name, email, password, avatar } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar,
    points: 100 // Default points for new users
  });

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    points: user.points,
    token
  });
});

const login = asyncHandler(async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    points: user.points,
    token
  });
});

module.exports = { register, login };