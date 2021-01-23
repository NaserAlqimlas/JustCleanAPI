const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Tower = require("../models/Tower");
const Office = require("../models/Office");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get towers list
router.get("/get", async (req, res) => {
  if (req.query.order) {
    // order by whatever is passed in the body field 'order' -- used for sorting
    await Tower.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      order: [req.query.order],
    })
      .then((towers) => {
        res.status(200).json(towers);
      })
      .catch((err) => res.status(404).json({ error: err }));
  } else if (req.query["show-with-offices"]) {
    // return towers that have offices
    console.log("mah");
    await Tower.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      include: [
        {
          model: Office,
        },
      ],
    })
      .then((towers) => {
        res.status(200).json(towers);
      })
      .catch((err) => res.status(404).json({ error: err }));
  } else {
    await Tower.findAll({ limit: req.query.limit, offset: req.query.offset })
      .then((towers) => {
        res.status(200).json(towers);
      })
      .catch((err) => res.status(404).json({ error: err }));
  }
});

router.get("/search", (req, res) => {
  let {
    name,
    location,
    numberOfFloors,
    rating,
    longitude,
    latitude,
  } = req.body;

  // handling null values, temporary workaround
  // TODO: find a better way to handle this
  numberOfFloors == null ? (numberOfFloors = -1) : numberOfFloors;
  rating == null ? (rating = -1) : rating;
  longitude == null ? (longitude = 181) : longitude;
  latitude == null ? (latitude = 91) : latitude;

  Tower.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
    where: {
      name: {
        [Op.like]: "%" + name + "%",
      },
      location: {
        [Op.like]: "%" + location + "%",
      },
      numberOfFloors: numberOfFloors,
      rating: {
        [Op.like]: rating,
      },
      longitude: longitude,
      latitude: latitude,
    },
  })
    .then((towers) => {
      res.status(200).json(towers);
    })
    .catch((err) => res.status(404).json({ error: err }));
});

// Create a new tower entry
router.post("/create", (req, res) => {
  const {
    name,
    location,
    numberOfFloors,
    rating,
    longitude,
    latitude,
  } = req.body;

  console.log(req.body);

  Tower.create({
    name,
    location,
    numberOfFloors,
    rating,
    longitude,
    latitude,
  })
    .then((tower) => res.status(200).json(tower))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete", (req, res) => {
  Tower.destroy({ where: { id: req.query.id } })
    .then((rowsDeleted) => res.sendStatus(200))
    .catch((err) => res.status(404).json({ error: err, id: req.query.id }));
});

module.exports = router;
