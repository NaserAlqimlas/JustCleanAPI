const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Office = require("../models/Office");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get offices list
router.get("/get", (req, res) =>
  Offices.findAll()
    .then((offices) => {
      res.status(200).json(offices);
    })
    .catch((err) => res.status(404).json({ error: err }))
);

// Create a new office entry
router.post("/create", (req, res) => {
  const { name, tower_id } = req.body;

  Office.create({
    name,
    tower_id,
  })
    .then((office) => res.status(200))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete", (req, res) => {
  const targetId = req.query.id;

  Tower.findAll({ where: { id: { targetId } } })
    .destroy()
    .then((office) => res.status(200))
    .catch((err) => res.status(404).json({ error: err }));
});

module.exports = router;
