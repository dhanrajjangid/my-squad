const Hotel = require("../models/hotelModel");

const addHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.json({ message: "Hotel added successfully", hotel: newHotel });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add hotel", error: error.message });
  }
};

const getHotels = async (req, res) => {
  try {
    let filter = {};

    // Check if the 'status' query parameter is provided
    if (req.query.status) {
      // Assuming 'status' is a field in your hotel schema
      filter.status = req.query.status;
    }

    // Use the filter in the query
    const hotels = await Hotel.find(filter);

    res.json(hotels);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json({ message: "Hotel updated successfully", hotel: updatedHotel });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update hotel", error: error.message });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json({ message: "Hotel deleted successfully", hotel: deletedHotel });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete hotel", error: error.message });
  }
};

module.exports = { addHotel, getHotels, updateHotel, deleteHotel };
