var express = require("express");
var router = express.Router();

// Login
router.get("/login", (req, res, next) => res.render("login"));

// Register
router.get("/register", (req, res, next) => res.render("register"));

// Register Handle
router.post("/register", (req, res, next) => {
  console.log(req.body);
  res.send("hello");
});
module.exports = router;
