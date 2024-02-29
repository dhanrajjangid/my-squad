const express = require('express');
const router = express.Router();
const { updatePlayerLocation } = require('../controllers/locationController');
const searchPlayerController = require("../controllers/searchPlayerController");

// Route to update player location
router.put('/player-location/:id', updatePlayerLocation);

// Search players route
router.get("/search-players", searchPlayerController.searchPlayers);
module.exports = router;
