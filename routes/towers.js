const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const Tower = require("../models/Tower");
const Office = require("../models/Office");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// verify token -- for create, update, delete.
// need this for JWT Authentication.
const verifyToken = (req, res, next) => {
  // Get auth token
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") {
    // Forbidden
    res.sendStatus(403);
  } else {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    next();
  }
};

// get towers list
router.get("/get", (req, res) => {
  if (req.query.order && req.query.col) {
    // order by whatever is passed in the body field 'order' -- used for sorting
    // will check for query for col -- the column to order by and order -- whether to order by Ascending (ASC) or descending (DESC)
    Tower.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      order: [[req.query.col, req.query.order]]
    })
      .then((towers) => {
        res.status(200).json(towers);
      })
      .catch((err) => res.status(404).json({ error: err }));
  } else if (req.query["show-with-offices"]) {
    // return towers that have offices
    Tower.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      include: {
        model: Office,
        required: true
      }
    })
      .then((towers) => {
        res.status(200).json(towers);
      })
      .catch((err) => res.status(404).json({ error: err }));
  } else if (req.query.name || req.query.location || req.query.numberOfFloors || req.query.rating || req.query.longitude || req.query.latitude) {
    // filter/search by passing what to search by (col) and the search query
    const filterquery = req.query.filterquery;
    const filtercol = req.query.filtercol;
    const filterquery2 = req.query.filterquery2;
    const filtercol2 = req.query.filtercol2;

    Tower.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        [Op.or]: [{
          name: {[Op.iLike]: `${req.query.name || ""}`}
        },
        {
          location: {[Op.iLike]: `${req.query.location || ""}`}
        },
        {
          numberOfFloors: {[Op.iLike]: Number(`${req.query.numberOfFloors || 0}`)}
        },
        {
          rating: {[Op.iLike]: parseFloat(`${req.query.rating || 0.0}`)}
        },
        {
          longitude: {[Op.iLike]: parseFloat(`${req.query.longitude || 0.0}`)}
        },
        {
          latitude: {[Op.iLike]: parseFloat(`${req.query.latitude || 0.0}`)}
        },
      ]
      }
    })
      .then((towers) => {
        res.status(200).json(towers);
      })
      .catch((err) => res.status(404).json({ error: err }));
  } else {
    Tower.findAll({ limit: req.query.limit, offset: req.query.offset })
      .then((towers) => {
        res.status(200).json(towers);
      })
      .catch((err) => res.status(404).json({ error: err }));
  }
});

// Create a new tower entry
router.post("/create", verifyToken, (req, res) => {
  jwt.verify(req.token, "supersecretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Tower.create(req.body)
        .then((tower) => res.status(200).json(tower))
        .catch((err) => res.status(500).json({ error: err }));
    }
  });
});

router.put("/update", verifyToken, async (req, res) => {
  jwt.verify(req.token, "supersecretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { id } = req.body;
      // delete id so we pass req.body in tower.update without running into issues
      delete req.body.id;

      Tower.update(req.body, { where: { id: id } })
        .then((rowsUpdated) => res.sendStatus(200).json(rowsUpdated))
        .catch((err) => res.status(404).json({ error: err, id: id }));
    }
  });
});

router.delete("/delete", verifyToken, (req, res) => {
  jwt.verify(req.token, "supersecretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Tower.destroy({ where: { id: req.query.id } })
        .then((rowsDeleted) => res.sendStatus(200).json(rowsDeleted))
        .catch((err) => res.status(404).json({ error: err, id: req.query.id }));
    }
  });
});

module.exports = router;
