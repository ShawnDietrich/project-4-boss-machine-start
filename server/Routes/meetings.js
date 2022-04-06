const express = require("express");
const {getAllFromDatabase, getFromDatabaseById, 
    addToDatabase, updateInstanceInDatabase,
deleteAllFromDatabase, deleteFromDatabasebyId
} = require('../db')
const bodyParser = require('body-parser');
const meetingsRouter = express.Router();
module.exports = { meetingsRouter };


meetingsRouter.use(bodyParser.json());

meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
})

