const express = require("express");
const bodyParser = require('body-parser')
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteAllFromDatabase,
  deleteFromDatabasebyId,
} = require("../db");
const minionsRouter = express.Router();
module.exports = { minionsRouter };

minionsRouter.use(bodyParser.json());

minionsRouter.get("/", (req, res, next) => {
  const minions = getAllFromDatabase("minions");
  res.send(minions);
});

minionsRouter.get("/:minionId", (req, res, next) => {
    const minionId = String(req.params.minionId);
    const minion = getFromDatabaseById('minions', minionId);

    if (minion === null ){
        return res.status(404).send(`id: ${minionId} not found`)
    }
    res.send(minion);
});

minionsRouter.get('/:minionId/work', (req, res, next) => {

    const work = getFromDatabaseById('work', req.params.minionId)
    if (work === null ){
        return res.status(404).send()
    }
    res.send(work)
})

