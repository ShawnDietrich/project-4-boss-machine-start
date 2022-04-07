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
const ideasRouter = express.Router();
module.exports = { ideasRouter };

ideasRouter.use(bodyParser.json());

//return all the ideas in the database
ideasRouter.get("/", (req, res, next) => {
  const ideas = getAllFromDatabase("ideas");
  //console.log(ideas);
  res.send(ideas);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  const ideaId = String(req.params.ideaId);
  const idea = getFromDatabaseById("ideas", ideaId);

  if (idea === null) {
    return res.status(404).send(`Id: ${ideaId} not found`);
  }
  res.send(idea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  const updateIdea = req.body;
  Number(updateIdea.numWeeks);
  Number(updateIdea.weeklyRevenue);
  if (getFromDatabaseById("ideas", updateIdea.id) !== -1) {
    updateInstanceInDatabase("ideas", updateIdea);
    console.log(updateIdea);
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

ideasRouter.post("/", (req, res, next) => {
  const newIdea = req.body;
  //convert strings entrys to numbers
  Number(newIdea.numWeeks);
  Number(newIdea.weeklyRevenue);

  if (newIdea) {
    const addedIdea = addToDatabase("ideas", newIdea);
    res.send(addedIdea);
  }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    if(getFromDatabaseById('ideas', ideaId) === -1) {
        res.status(404).send();
    } else {
        deleteFromDatabasebyId('ideas', ideaId);
        res.status(200).send();
    }
});

