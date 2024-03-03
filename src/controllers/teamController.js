const Team = require("../models/teamModel");
const Player = require("../models/playerModel");

const addTeam = async (req, res) => {
  try {
    const { 
      teamName,
      venue,
      date,
      duration,
      capacity,
      player_id
    } = req.body;

    // Retrieve player details from the database
    const player = await Player.findById(player_id);
    
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Extract location from the player document
    const { currentLocation } = player;

    // Ensure location is provided as [longitude, latitude]
    const newTeam = new Team({
      teamName,
      venue,
      date,
      duration,
      capacity,
      admin: player_id,
      location: {
        type: "Point",
        coordinates: currentLocation.coordinates,
      },
    });

    await newTeam.save();
    res.json({ message: "Team added successfully", team: newTeam });
  } catch (error) {
    res.status(500).json({ message: "Failed to add team", error: error.message });
  }
};


const getTeams = async (req, res) => {
  try {
    let filter = {};

    // Check if the 'status' query parameter is provided
    if (req.query.status) {
      // Assuming 'status' is a field in your team schema
      filter.status = req.query.status;
    }

    // Use the filter in the query
    const teams = await Team.find(filter);

    res.json(teams);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "Team updated successfully", team: updatedTeam });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update team", error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const deletedTeam = await Team.findByIdAndDelete(teamId);

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "Team deleted successfully", team: deletedTeam });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete team", error: error.message });
  }
};

module.exports = { addTeam, getTeams, updateTeam, deleteTeam };
