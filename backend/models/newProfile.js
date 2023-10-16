const mongoose = require("mongoose");
const { Schema } = mongoose;
const newProfileSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  profile_data: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model("profile", newProfileSchema);
