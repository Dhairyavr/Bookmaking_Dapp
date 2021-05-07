const mongoose = require("mongoose");
const UserDetails = require("./user-details");
const loginSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_details",
  },
});

module.exports = mongoose.model("users", loginSchema);
