const mongoose = require("mongoose");

const betSchema = new mongoose.Schema({
  id: {
    type: String,
  },
});

module.exports = mongoose.model("bets", betSchema);
