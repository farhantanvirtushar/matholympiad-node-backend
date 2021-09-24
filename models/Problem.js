const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    olympiadID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
      max: 1000,
    },
    ans: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
