const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/getTeams", teamController.getTeams);
router.post("/addTeam", teamController.addTeam);
router.put("/updateTeam/:id", teamController.updateTeam);
router.delete("/deleteTeam/:id", teamController.deleteTeam);

module.exports = router;
