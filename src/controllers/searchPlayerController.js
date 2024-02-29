// searchPlayerController.js
const Player = require("../models/playerModel"); // Adjust the path based on your project structure

// Search players based on city, location, or category
const searchPlayers = async (req, res) => {
  try {
    const { location } = req.query;
    let query = {};

    if (location) {
      // Assuming location is a GeoJSON Point
      query.currentLocation = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: location,
          },
          $maxDistance: 10000, // Adjust the maximum distance as needed (in meters)
        },
      };
    }

    const players = await Player.find(query);

    res.status(200).json({
      success: true,
      data: players,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Add other controller functions or variables as needed

module.exports = {
  searchPlayers,
  // Add other exports if needed
};
