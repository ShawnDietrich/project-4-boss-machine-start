const express = require("express");
const {getAllFromDatabase, getFromDatabaseById, 
    addToDatabase, updateInstanceInDatabase,
deleteAllFromDatabase, deleteFromDatabasebyId
} = require('../db')
const meetingsRouter = express.Router();
module.exports = { meetingsRouter };
