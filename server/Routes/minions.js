const express = require("express");
const bodyParser = require("body-parser");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteAllFromDatabase,
  deleteFromDatabasebyId,
} = require("../db");
const minionsRouter = express.Router();
module.exports = minionsRouter;

minionsRouter.use(bodyParser.json());

minionsRouter.get("/", (req, res, next) => {
  const minions = getAllFromDatabase("minions");
  if (minions.length === 0) {
    res.status(404).send();
  } else {
    res.status(200).send(minions);
  }
});

minionsRouter.get("/:minionId", (req, res, next) => {
  const minionId = String(req.params.minionId);
  const minion = getFromDatabaseById("minions", minionId);

  if (minion === null) {
    return res.status(404).send(`id: ${minionId} not found`);
  }
  res.send(minion);
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = {
    name: req.body.name,
    title: req.body.title,
    weaknesses: req.body.weaknesses,
    salary: Number(req.body.salary),
  };

  if (
    newMinion.name &&
    newMinion.title &&
    newMinion.weaknesses &&
    newMinion.salary > 0
  ) {
    const addedMinion = addToDatabase("minions", newMinion);
    res.send(addedMinion);
  }
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const updateMinion = req.body;
  Number(updateMinion.salary);
  if (getFromDatabaseById("minions", updateMinion.id) !== -1) {
    updateInstanceInDatabase("minions", updateMinion);
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  if (getFromDatabaseById("minions", req.params.minionId) === -1) {
    res.status(404).send();
  } else {
    deleteFromDatabasebyId("minions", req.params.minionId);
    res.status(200).send();
  }
});

//bouns work
minionsRouter.get("/:minionId/work", (req, res, next) => {
  const work = getFromDatabaseById("work", req.params.minionId);
  if (work === null) {
    return res.status(404).send();
  }
  res.send(work);
});
