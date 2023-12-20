const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.get("/getPlayers", playerController.getPlayers);
router.post("/addPlayer", playerController.addPlayer);
router.put("/updatePlayer/:id", playerController.updatePlayer);
router.delete("/deletePlayer/:id", playerController.deletePlayer);

module.exports = router;
