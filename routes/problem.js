const express = require("express");
const Olympiad = require("../models/Olympiad");
const Problem = require("../models/Problem");

const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const newProblem = new Problem(req.body);

  try {
    let problem = await newProblem.save();

    if (problem) {
      let olympiad = Olympiad.findById(problem.olympiadID);

      await olympiad.updateOne({ $push: { problems: problem._id } });

      return res.status(200).json({ olympiadID: problem.olympiadID });
    } else {
      return res.status(500).json("error adding problem");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let problem = await Problem.findById(req.params.id);

    if (problem) {
      return res.status(200).json(problem);
    } else {
      return res.status(500).json("error adding problem");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
