// playerController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Player = require("../models/playerModel");

const registerPlayer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPlayer = new Player({
      name,
      email,
      password: hashedPassword,
    });

    await newPlayer.save();

    res.json({
      message: "Player registered successfully",
      playerId: newPlayer._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register player", error: error.message });
  }
};

const loginPlayer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the player by email
    const player = await Player.findOne({ email });

    if (!player) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, player.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ playerId: player._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Player logged in successfully",
      token,
      email: player.email,
      name: player.name,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to login player", error: error.message });
  }
};

module.exports = { registerPlayer, loginPlayer };
