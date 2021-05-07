const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  poll_id: {
    type: String,
    required: true,
  },
  starting_at: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("allpolls", pollSchema);
