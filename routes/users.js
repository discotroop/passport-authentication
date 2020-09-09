var express = require("express");
var router = express.Router();

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
    res.send("pass");
  }

  console.log(name, email, password, passwordConfirm);
  res.send("hello");
});
module.exports = router;
