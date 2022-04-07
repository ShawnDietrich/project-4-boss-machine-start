const express = require("express");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteAllFromDatabase,
  deleteFromDatabasebyId,
  createMeeting,
} = require("../db");
const bodyParser = require("body-parser");
const meetingsRouter = express.Router();
module.exports =  meetingsRouter;

meetingsRouter.use(bodyParser.json());

meetingsRouter.get("/", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");
  res.send(meetings);
});

meetingsRouter.post("/", (req, res, next) => {
  const addedMeeting = createMeeting();
  res.status(201).send(addedMeeting);
});

meetingsRouter.delete("/", (req, res, next) => {
  deleteAllFromDatabase("meetins");
  res.status(201).send();
});
