const {
  getTemperamentsFromApi,
} = require("../controllers/temperamentsControllers");
const { Temperament } = require("../db");

const getTemperamentsHandler = async (req, res) => {
  try {
    const temperamentsExist = await Temperament.findAll({});
    if (temperamentsExist.length === 0) {
     
      await getTemperamentsFromApi();
    }

    const temperaments = await Temperament.findAll({});

    res.json(temperaments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*const newTemperament = await Temperament.create({ name });

    res.status(201).json(newTemperament);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};*/

module.exports = {
  getTemperamentsHandler,
};
