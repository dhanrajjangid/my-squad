const express = require('express');
const router = express.Router();
const { updatePlayerLocation } = require('../controllers/locationController');
const searchPlayerController = require("../controllers/searchPlayerController");
const searchTeamController = require("../controllers/searchTeamController")

// Route to update player location
router.put('/player-location/:id', updatePlayerLocation);

// Search players route
router.get("/search-players", searchPlayerController.searchPlayers);
router.get("/search-teams", searchTeamController.searchTeams);

module.exports = router;
