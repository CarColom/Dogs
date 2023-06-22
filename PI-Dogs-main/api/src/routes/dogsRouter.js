const { Router } = require("express");
const {
  getDogsHandler,
  getDogsHandlerId,
  postDogsHandler,
  deleteDogHandler,
} = require("../handlers/handlersDogs");

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/:idRaza", getDogsHandlerId);

dogsRouter.post("/", postDogsHandler);

dogsRouter.delete("/:id", deleteDogHandler);



module.exports = dogsRouter;
