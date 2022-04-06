//Import required code
const express = require("express");
const bodyParser = require("body-parser");
const {getAllFromDatabase, getFromDatabaseById, 
    addToDatabase, updateInstanceInDatabase,
deleteAllFromDatabase, deleteFromDatabasebyId
} = require('../db')
const ideasRouter = express.Router();
module.exports = { ideasRouter };
