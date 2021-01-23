const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Tower = require("../models/Tower");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get towers list
router.get("/", (req, res) =>
  Tower.findAll()
    .then((towers) => {
      console.log(towers);
      res.sendStatus(200);
    })
    .catch((err) => console.log("Error: ", err))
);

// Create a new tower entry
router.post("/create", (req, res) => {
  const {
    name,
    location,
    numberOfFloors,
    numberOfOffices,
    rating,
    latitude,
    longitude,
  } = req.body;

  Tower.create({
    name,
    location,
    numberOfFloors,
    numberOfOffices,
    rating,
    latitude,
    longitude,
  })
    .then((tower) => res.sendStatus(200))
    .catch((err) => console.log("Error: ", err));
});

router.delete("/delete", (req, res) => {
  const targetId = req.body.id;

  Tower.findAll({ where: { id: { targetId } } })
    .destroy()
    .then((tower) => res.sendStatus(200))
    .catch((err) => console.log("Error: ", err));
});

module.exports = router;
