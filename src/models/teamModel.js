const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
});

const footballTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  overall_rating: { type: Number, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  players: [playerSchema],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

footballTeamSchema.index({ location: "2dsphere" });

const Team = mongoose.model("FootballTeam", footballTeamSchema);

module.exports = Team;
