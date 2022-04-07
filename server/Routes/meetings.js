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

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = {
        time: req.body.time,
        data: new Date(req.body.date),
        day: req.body.day,
        note: req.body.note
    }

    if (newMeeting) {
        const addedMeeting = addToDatabase('meetings', newMeeting);
        res.status(201).send(addedMeeting);
    } else {
        res.status(404).send();
    }
});

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetins');
    res.status(201).send();
})