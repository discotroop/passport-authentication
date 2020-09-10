var express = require("express");
var router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

// use font awesome as well ?

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
// router.get("/register", function(req, res, next) {
//   res.render("register");
// });
// router.get("/login", function(req, res, next) {
//   res.render("login");
// });
router.get("/dashboard", ensureAuthenticated, function(req, res, next) {
  res.render("dashboard", {
    name: req.user.name
  });
});

module.exports = router;
