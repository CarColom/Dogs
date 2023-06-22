const {
  createDogDB,
  getAllDogs,
  getDogById,
  deleteDogById,
} = require("../controllers/dogsControllers");

const getDogsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const response = await getAllDogs(name);
      return res.status(200).json(response);
    }
    const response = await getAllDogs();
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogsHandlerId = async (req, res) => {
  const { idRaza } = req.params;
  try {
    const response = await getDogById(idRaza);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postDogsHandler = async (req, res) => {
  const {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    image,
    temperament,
  } = req.body;
  try {
    const response = await createDogDB(
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      image,
      temperament
    );
    console.log(response)
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDogHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteDogById(id);
    res.status(200).send(`Eliminado Dog con id: ${id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  getDogsHandler,
  getDogsHandlerId,
  postDogsHandler,
 deleteDogHandler,
};
