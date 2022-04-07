const express = require("express");
const ideasRouter  = require("./Routes/ideas");
const meetingsRouter  = require("./Routes/meetings");
const minionsRouter = require("./Routes/minions");



//Mount the main route
const apiRouter = express.Router();
module.exports = apiRouter;

apiRouter.use("/ideas", ideasRouter);
apiRouter.use("/meetings", meetingsRouter);
apiRouter.use("/minions", minionsRouter);

