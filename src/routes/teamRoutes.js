const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const searchTeamController = require("../controllers/searchTeamController");
const teamJoinController = require("../controllers/teamJoinController");

router.get("/getTeamById/:id", teamController.getTeamById);

router.get("/getTeamsByPlayerId/:player_id", teamController.getTeamsByPlayerId);
router.post("/addTeam", teamController.addTeam);
router.put("/updateTeam/:id", teamController.updateTeam);
router.delete("/deleteTeam/:id", teamController.deleteTeam);

router.get("/searchTeams", searchTeamController.searchTeams);

router.post("/joinTeam", teamJoinController.joinTeam);
router.post("/leaveTeam", teamJoinController.leaveTeam);

module.exports = router;
