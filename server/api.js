const express = require('express');
const apiRouter = express.Router();
const app = express();
const PORT = 4001;
const cors = require('cors');
const bodyParser = require('body-parser');




//setup cors
app.use(cors());

//Mount the main route
app.use('/api', apiRouter);
module.exports = apiRouter;

//start server
app.listen(PORT, () => {
    console.log(`Server Listening On Port ${PORT}`);
});

