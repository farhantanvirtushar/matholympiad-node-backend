const express = require("express");
const Olympiad = require("../models/Olympiad");
const Result = require("../models/Result");
const Problem = require("../models/Problem");

const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const newOlympiad = new Olympiad(req.body);

  try {
    let olympiad = await newOlympiad.save();

    if (olympiad) {
      let result = new Result({ olympiadID: olympiad._id });
      result = await result.save();
      await olympiad.updateOne({ result: result._id });

      return res.status(200).json(olympiad);
    } else {
      return res.status(500).json("error creating olympiad");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const olympiad = await Olympiad.find();
    if (olympiad) {
      return res.status(200).json(olympiad);
    }
    return res.status(404).json("cannot show olympiad");
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const olympiad = await Olympiad.findById(req.params.id);
    if (olympiad) {
      return res.status(200).json(olympiad);
    }
    return res.status(404).json("cannot show olympiad");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const olympiad = await Olympiad.findById(req.params.id);
    if (!olympiad) {
      return res.status(500).json("olympiad was not found");
    }
    if (olympiad.createdBy == req.body.userID) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json("olympiad updated successfully");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const olympiad = await Olympiad.findById(req.params.id);
    if (!olympiad) {
      return res.status(500).json("post was not found");
    }
    if (olympiad.userID == req.body.userID) {
      await olympiad.deleteOne();
      return res.status(200).json("olympiad deleted successfully");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
