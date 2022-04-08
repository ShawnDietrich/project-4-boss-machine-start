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

//ID check
minionsRouter.param("minionId", (req, res, next) => {
  const id = Number(req.params.minionId);
  const minion = getFromDatabaseById("minions", req.params.minionId);

  if (isNaN(id) || minion === undefined) {
    return res.status(404).send();
  } else {
    next();
  }
});

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
  res.send(minion);
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = req.body;
  Number(newMinion.salary);
  if (
    newMinion.name !== null &&
    newMinion.title !== null &&
    newMinion.weaknesses !== null &&
    !isNaN(newMinion.salary)
  ) {
    const addedMinion = addToDatabase("minions", newMinion);
    res.status(201).send(addedMinion);
  }else {
    res.status(404).send();
  }
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const updateMinion = req.body;
  Number(updateMinion.salary);
  const newMinion = updateInstanceInDatabase("minions", updateMinion);
  res.status(200).send(newMinion);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  if (getFromDatabaseById("minions", req.params.minionId) === -1) {
    res.status(404).send();
  } else {
    deleteFromDatabasebyId("minions", req.params.minionId);
    res.status(204).send();
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
