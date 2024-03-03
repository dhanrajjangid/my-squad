const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  player_id: { type: String, default: "" }
});

const footballTeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: String, required: true },
  admin: {type: String, required: true},
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
  capacity: { type: Number, required: true },
  remaining: { type: Number, default: 0 },
  occupied: { type: Number, default: 0 },
  members: [teamMemberSchema]
});

footballTeamSchema.index({ location: "2dsphere" });

const Team = mongoose.model("FootballTeam", footballTeamSchema);

module.exports = Team;
