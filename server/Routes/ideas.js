//Import required code
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
const checkMillionDollarIdea = require("../checkMillionDollarIdea");
const ideasRouter = express.Router();
module.exports = ideasRouter;

ideasRouter.use(bodyParser.json());

//Id check middleware
ideasRouter.param("ideaId", (req, res, next) => {
  const id = Number(req.params.ideaId);
  const idea = getFromDatabaseById("ideas", req.params.ideaId);

  if (isNaN(id) || idea === undefined) {
    return res.status(404).send();
  } else {
    next();
  }
});

//return all the ideas in the database
ideasRouter.get("/", (req, res, next) => {
  const ideas = getAllFromDatabase("ideas");
  res.send(ideas);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  const ideaId = String(req.params.ideaId);
  const idea = getFromDatabaseById("ideas", ideaId);
  res.send(idea);
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
  const updateIdea = req.body;
  Number(updateIdea.numWeeks);
  Number(updateIdea.weeklyRevenue);
  const newIdea = updateInstanceInDatabase("ideas", updateIdea);
  res.status(200).send(newIdea);
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = req.body;
  //convert strings entrys to numbers
  Number(newIdea.numWeeks);
  Number(newIdea.weeklyRevenue);

  if (newIdea) {
    const addedIdea = addToDatabase("ideas", newIdea);
    res.status(201).send(addedIdea);
  }else {
    res.status(404).send();
  }
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  if (getFromDatabaseById("ideas", ideaId) === -1) {
    res.status(404).send();
  } else {
    deleteFromDatabasebyId("ideas", ideaId);
    res.status(204).send();
  }
});
