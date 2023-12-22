// playerController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Player = require("../models/playerModel");

// Create (POST)
const createPlayer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      position,
      state,
      city,
      currentLocation,
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPlayer = new Player({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      position,
      state,
      city,
      currentLocation,
    });

    await newPlayer.save();

    res.json({
      message: "Player created successfully",
      playerId: newPlayer._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create player", error: error.message });
  }
};

// Read (GET all players)
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json({ players });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch players", error: error.message });
  }
};

// Read (GET a specific player by ID)
const getPlayerById = async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ player });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch player", error: error.message });
  }
};

// Update (PUT)
const updatePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const {
      name,
      email,
      password,
      phoneNumber,
      position,
      state,
      city,
      currentLocation,
    } = req.body;

    // Hash the password if provided
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    // Find the player by ID and update
    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      {
        $set: {
          name,
          email,
          password: hashedPassword,
          phoneNumber,
          position,
          state,
          city,
          currentLocation,
        },
      },
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

// Delete (DELETE)
const deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;

    const deletedPlayer = await Player.findByIdAndRemove(playerId);

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

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
};
