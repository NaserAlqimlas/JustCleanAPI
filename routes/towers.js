const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Tower = require("../models/Tower");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get towers list
router.get("/get", (req, res) => {
  if (req.query.order) {
    // order by whatever is passed in the body field 'order' -- used for sorting
    Tower.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      order: [req.query.order],
    })
      .then((towers) => {
        res.sendStatus(200).json(towers);
      })
      .catch((err) => res.status(404).json({ error: err }));
  } else {
    Tower.findAll({ limit: req.query.limit, offset: req.query.offset })
      .then((towers) => {
        res.sendStatus(200).json(towers);
      })
      .catch((err) => res.status(404).json({ error: err }));
  }
});

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
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete", (req, res) => {
  const targetId = req.query.id;

  Tower.findAll({ where: { id: { targetId } } })
    .destroy()
    .then((tower) => res.sendStatus(200))
    .catch((err) => res.status(404).json({ error: err }));
});

module.exports = router;
