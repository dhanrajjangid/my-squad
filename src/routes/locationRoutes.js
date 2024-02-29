const express = require('express');
const router = express.Router();
const { updatePlayerLocation } = require('../controllers/locationController');

// Route to update player location
router.put('/player-location/:id', updatePlayerLocation);

module.exports = router;
