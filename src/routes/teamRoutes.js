const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const searchTeamController = require("../controllers/searchTeamController");

router.get("/getTeams", teamController.getTeams);
router.post("/addTeam", teamController.addTeam);
router.put("/updateTeam/:id", teamController.updateTeam);
router.delete("/deleteTeam/:id", teamController.deleteTeam);

router.get("/searchTeams", searchTeamController.searchTeams);

module.exports = router;
