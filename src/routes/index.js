const { Router } = require("express");

const routes = Router();

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const countRouter = require("./count.routes");

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/count", countRouter);

module.exports = routes;