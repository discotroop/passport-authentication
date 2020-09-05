var express = require("express");
var router = express.Router();

// use font awesome as well ?

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/register", function(req, res, next) {
  res.render("register");
});
router.get("/login", function(req, res, next) {
  res.render("login");
});
router.get("/dashboard", function(req, res, next) {
  res.render("dashboard");
});

module.exports = router;
