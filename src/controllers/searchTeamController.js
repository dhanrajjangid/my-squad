const Team = require("../models/teamModel");

const searchTeams = async (req, res) => {
  try {
    const { category, location } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (location) {
      // Check if location is provided before using it
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: location.split(",").map(Number),
          },
          $maxDistance: 1000,
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
