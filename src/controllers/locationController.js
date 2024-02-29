const Player = require("../models/playerModel");

// Update player location
const updatePlayerLocation = async (req, res) => {
  try {
    const playerId = req.params.id;
    const { latitude, longitude } = req.body;

    // Ensure latitude and longitude are provided
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    // Update the player's currentLocation
    const updatedPlayer = await Player.updateLocation(playerId, [longitude, latitude]);

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player location updated successfully", player: updatedPlayer });
  } catch (error) {
    res.status(500).json({ message: "Failed to update player location", error: error.message });
  }
};

module.exports = {
  updatePlayerLocation,
};
