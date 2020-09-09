const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");

// User Model
const User = require("../models/User.js");

// Login
router.get("/login", (req, res, next) => res.render("login"));

// Register
router.get("/register", (req, res, next) => res.render("register"));

// Register Handle
router.post("/register", (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  let errors = [];

  // check required fields / validations
  if (!name || !email || !password || !passwordConfirm) {
    errors.push({ message: "Please fill in all fields" });
  }
  // check passwords match
  if (password != passwordConfirm) {
    errors.push({ message: "Passwords do not match" });
  }
  // check minimum password length
  if (password.length < 6) {
    errors.push({ message: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      passwordConfirm
    });
  } else {
    // validation has passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        // user exists
        errors.push({ message: "Email already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          passwordConfirm
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // set Password to Hashed
            newUser.password = hash;
            // Save User
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_message",
                  "You are registered and can login"
                );
                res.redirect("/users/login");
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});
module.exports = router;
