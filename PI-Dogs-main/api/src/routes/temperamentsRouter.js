const { Router } = require("express");
const { getTemperamentsHandler } = require("../handlers/handlerTemperaments");

const temperamentsRouter = Router();

temperamentsRouter.get("/", getTemperamentsHandler);

module.exports = temperamentsRouter;
