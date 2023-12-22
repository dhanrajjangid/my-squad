// playerModel.js
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, default: "" },
  position: { type: String, default: "" },
  state: { type: String, default: "" },
  city: { type: String, default: "" },
  currentLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
});

playerSchema.index({ currentLocation: "2dsphere" });
const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
