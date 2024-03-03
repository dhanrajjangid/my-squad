const Team = require("../models/teamModel");

const searchTeams = async (req, res) => {
  try {
    const { latitude, longitude, distance } = req.query;


    let query = {};

    if (latitude && longitude) {
      // Check if location is provided before using it
      query.currentLocation = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: distance ?? 1000, // Adjust the maximum distance as needed (in meters)
        },
      };
    }

    const teams = await Team.find(query);

    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    console.error("Error searching teams:", error);

    res.status(500).json({
      success: false,
      error: {
        message: "Internal Server Error",
        details: error.message,
      },
    });
  }
};

module.exports = {
  searchTeams,
};
