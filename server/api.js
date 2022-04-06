const express = require('express');
const apiRouter = express.Router();
const app = express();
const PORT = 4001;
const cors = require('cors');
const bodyParser = require('body-parser');
const { ideasRouter } = require('./Routes/ideas');
const { meetingsRouter } = require('./Routes/meetings');
const { minionsRouter } = require('./Routes/minions');




//setup cors
app.use(cors());

//Mount the main route
app.use('/api', apiRouter);
app.use('/api/ideas', ideasRouter)
app.use('/api/meetings', meetingsRouter)
app.use('/api/minions', minionsRouter)

module.exports = apiRouter;

//start server
app.listen(PORT, () => {
    console.log(`Server Listening On Port ${PORT}`);
});

