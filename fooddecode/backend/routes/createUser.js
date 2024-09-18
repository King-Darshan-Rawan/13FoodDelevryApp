const express = require('express');
const router = express.Router();
const User = require('./../models/User.js');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtseac = "$2a$12$BykiiO7HbboS4uwIP0k4KuuRnZO49s18aUD9OrOVUDrxABfCFM.dS"
router.post(
  '/createUser',
  [
    body('email', 'Please provide a valid email address').isEmail(),
    body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
    body('name', 'Name must be at least 5 characters long').isLength({ min: 5 }),
    body('location', 'Location is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      const newUser = await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: securePassword,
      });

      // Generate authToken after successful user creation
      const data = {
        user: {
          id: newUser.id
        }
      };
      const authToken = jwt.sign(data, jwtseac);

      // Send the token along with success response
      res.json({ success: true, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
);


router.post(
    '/loginUser',
    [
        body('email', 'Please provide a valid email address').isEmail(),
        body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
      ],
    async (req, res) => {
      // Validate email and password presence
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please provide email and password' });
      }
  
      try {
        // Find the user by email
        const userData = await User.findOne({ email });
        
        if (!userData) {
          return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }
  
        // Check if the password matches
        const saltedPassword = await bcrypt.compare(req.body.password, userData.password)
        if (!saltedPassword) {
          return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }
        const data = {
          user:{
            id:userData.id
          }
        }
        const authToken = jwt.sign(data,jwtseac)

        // If login is successful
        res.status(200).json({ success: true, authToken });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
      }
    }
  );
  

module.exports = router;
