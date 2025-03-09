const { Router } = require("express");

const usersRoutes = Router();

const UsersController = require("../controllers/UsersController");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersController = new UsersController();

usersRoutes.use(ensureAuthenticated);

usersRoutes.get("/:id", verifyUserAuthorization(), usersController.show);
usersRoutes.post("/", verifyUserAuthorization(), usersController.create);

module.exports = usersRoutes;