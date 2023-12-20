const Player = require("../models/playerModel");

const addPlayer = async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.json({ message: "Player added successfully", player: newPlayer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add player", error: error.message });
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate("team", "name");
    res.json(players);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      req.body,
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player updated successfully", player: updatedPlayer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update player", error: error.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const deletedPlayer = await Player.findByIdAndDelete(playerId);

    if (!deletedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player deleted successfully", player: deletedPlayer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete player", error: error.message });
  }
};

module.exports = { addPlayer, getPlayers, updatePlayer, deletePlayer };
