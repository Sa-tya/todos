require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const auth = require("../middleware/auth");

// const todos = require('./todos');
// const home = require('../views/home.jade')
var router = express.Router();


router.get('/', (req, res) => {
  res.status(200).render('home')
  // res.redirect('/welcome');
});

router.get('/signup', (req, res) => {
  res.render('signup')
});

router.post("/signup", async (req, res) => {
  try {
    // Get user input
    const { username, email, password } = req.query;

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }
    else {
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      else {
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
          username,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });

        // Create token
        // const token = jwt.sign(
        //   { user_id: user._id, email },
        //   process.env.TOKEN_KEY,
        //   {
        //     expiresIn: "2h",
        //   }
        // );
        // save user token
        // user.token = token;
        // res.cookie(user._id, token);
        // return new user
        res.status(201).json(user);
        res.redirect('/login');
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login')
});

router.post("/login", async (req, res) => {
  // console.log('login', req.query)
  try {
    // Get user input
    const { email, password } = req.query;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      // user.token = token;
      res.cookie('token', token);
      res.status(200).json(token);
      // res.redirect('/welcome');
    }
    else
      res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// This should be the last route else any after it won't work
router.use("*", (req, res) => {
  // res.status(404).json({
  //   success: "false",
  //   message: "Page not found",
  //   error: {
  //     statusCode: 404,
  //     message: "You reached a route that is not defined on this server",
  //   },
  // });
  // res.redirect('/welcome')
  res.status(404).send('Its a wrong URL content not found');
});

module.exports = router;