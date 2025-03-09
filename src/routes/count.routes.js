const { Router } = require("express");

const countRoutes = Router();

const CountController = require("../controllers/CountController");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const countController = new CountController();
countRoutes.use(ensureAuthenticated);

countRoutes.get("/export", verifyUserAuthorization(), countController.exportCSV);
countRoutes.get("/", countController.index);
countRoutes.get("/:id", countController.show);
countRoutes.post("/", verifyUserAuthorization(), countController.create);
countRoutes.put("/", countController.update)

module.exports = countRoutes;