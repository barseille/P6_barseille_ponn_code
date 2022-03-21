const express = require("express");

// création de router
const router = express.Router();

const userCtrl = require("../controllers/user");

//renvoi les données au front
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
