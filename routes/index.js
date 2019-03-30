var express = require("express");
var router = express.Router();
const User = require("../models/User");

/* GET home page. */
router.get("/", async function(req, res, next) {
  res.reply({ data: { title: "Express" } });
});

router.get("/create-user", async function(req, res, next) {
  try {
    let newUser = new User({
      name: "Falen",
      email: "m.khizeryounas@gmail.com",
      password: "123"
    });
    let r = await newUser.save();
    console.log(r);
    res.reply({ data: r });
  } catch (err) {
    next(err);
  }
});

router.get("/update-user/", async function(req, res, next) {
  try {
    let _user = await User.findOne({ email: "m.khizeryounas@gmail.com" });
    _user.name = "mkhizeryounas";
    _user.password = "abc123";
    let r = await _user.save();
    res.reply({ data: r });
  } catch (err) {
    next(err);
  }
});

router.get("/check-user/:pwd", async function(req, res, next) {
  try {
    let _user = await User.findOne({ email: "m.khizeryounas@gmail.com" });
    let r = await _user.checkPassword(req.params.pwd);
    res.reply({ data: r });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
