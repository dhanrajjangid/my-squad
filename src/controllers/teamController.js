const Team = require("../models/teamModel");

const addTeam = async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.json({ message: "Team added successfully", team: newTeam });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add team", error: error.message });
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
