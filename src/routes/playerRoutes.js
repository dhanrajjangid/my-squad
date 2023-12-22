// playerRoutes.js
const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.post("/register", playerController.registerPlayer);
router.post("/login", playerController.loginPlayer);

module.exports = router;
