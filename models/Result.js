const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  olympiadID: {
    type: String,
    required: true,
  },
  ranking: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Result", resultSchema);
