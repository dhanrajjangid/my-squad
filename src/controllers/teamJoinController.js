const Team = require("../models/teamModel");

const joinTeam = async (req, res) => {
  try {
    const { teamId, playerId, playerName } = req.body;

    // Find the team by ID
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Check if the player already exists in the team
    const existingMember = team.members.find(
      (member) => member.player_id === playerId
    );

    if (existingMember) {
      return res.status(400).json({ message: "Player already in the team" });
    }

    // Add the player to the team
    team.members.push({
      name: playerName,
      player_id: playerId,
    });

    // Update the remaining and occupied slots
    team.remaining = Math.max(0, team.capacity - team.members.length);
    team.occupied = team.capacity - team.remaining;

    // Save the updated team
    await team.save();

    res.json({ message: "Player joined the team successfully", team });
  } catch (error) {
    res.status(500).json({ message: "Failed to join team", error: error.message });
  }
};

// API to leave the team

const leaveTeam = async (req, res) => {
    try {
      const { teamId, playerId } = req.body;
  
      // Find the team by ID
      const team = await Team.findById(teamId);
  
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
  
      // Check if the player is a member of the team
      const memberIndex = team.members.findIndex(
        (member) => member.player_id === playerId
      );
  
      if (memberIndex === -1) {
        return res.status(400).json({ message: "Player is not in the team" });
      }
  
      // Remove the player from the team
      team.members.splice(memberIndex, 1);
  
      // Update the remaining and occupied slots
      team.remaining = Math.max(0, team.capacity - team.members.length);
      team.occupied = team.capacity - team.remaining;
  
      // Save the updated team
      await team.save();
  
      res.json({ message: "Player left the team successfully", team });
    } catch (error) {
      res.status(500).json({ message: "Failed to leave team", error: error.message });
    }
  };

module.exports = { joinTeam, leaveTeam };
