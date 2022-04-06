//Import required code
const express = require("express");
const bodyParser = require("body-parser");
const {getAllFromDatabase, getFromDatabaseById, 
    addToDatabase, updateInstanceInDatabase,
deleteAllFromDatabase, deleteFromDatabasebyId
} = require('../db');
const ideasRouter = express.Router();
module.exports = { ideasRouter };

ideasRouter.use(bodyParser.json());
//return all the ideas in the database
ideasRouter.get('/', (req,res,next) => {
    const ideas = getAllFromDatabase('ideas');
    //console.log(ideas);
    res.send(ideas);
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaId = String(req.params.ideaId);
    const idea = getFromDatabaseById('ideas', ideaId);

    if(idea === null) {
       return res.status(404).send(`Id: ${ideaId} not found`);
    }
    res.send(idea);
})
