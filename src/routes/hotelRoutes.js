const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.get("/getHotels", hotelController.getHotels);
router.post("/addHotel", hotelController.addHotel);
router.put("/updateHotel/:id", hotelController.updateHotel);
router.delete("/deleteHotel/:id", hotelController.deleteHotel);

module.exports = router;
