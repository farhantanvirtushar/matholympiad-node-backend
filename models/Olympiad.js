const mongoose = require("mongoose");

const olympiadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    problems: {
      type: Array,
      default: [],
    },
    startTime: {
      type: String,
      default: "",
    },
    finishTime: {
      type: String,
      default: "",
    },
    result: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Olympiad", olympiadSchema);
