const express = require("express");
const {getAllFromDatabase, getFromDatabaseById, 
    addToDatabase, updateInstanceInDatabase,
deleteAllFromDatabase, deleteFromDatabasebyId
} = require('../db')
const minionsRouter = express.Router();
module.exports = { minionsRouter };
