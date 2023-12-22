const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
});

const footballTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  overall_rating: { type: Number, required: true },
  players: [playerSchema],
});

const FootballTeam = mongoose.model("FootballTeam", footballTeamSchema);

module.exports = FootballTeam;
