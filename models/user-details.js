const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    required: true,
  },
  polls: [
    {
      poll_id: {
        type: String,
      },
      closed: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("user_details", userDetailsSchema);
