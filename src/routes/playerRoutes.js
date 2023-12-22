// playerRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const playerController = require("../controllers/playerController");
const searchPlayerController = require("../controllers/searchPlayerController");

// CRUD operations with descriptive names
router.post("/add-player", playerController.createPlayer);
router.get("/get-players", playerController.getAllPlayers);
router.get("/get-player/:id", playerController.getPlayerById);
router.put("/update-player/:id", playerController.updatePlayer);
router.delete("/delete-player/:id", playerController.deletePlayer);

// Authentication routes (assuming authController has registerPlayer and loginPlayer functions)
router.post("/register", authController.registerPlayer);
router.post("/login", authController.loginPlayer);

// Search players route
router.get("/search-players", searchPlayerController.searchPlayers);

module.exports = router;
