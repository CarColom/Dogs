const axios = require("axios");
const { Temperament } = require("../db");

const getTemperamentsFromApi = async () => {
  const apiUrl = "https://api.thedogapi.com/v1/breeds";
  const response = await axios.get(apiUrl);

 
  const temperaments = response.data
    .map((el) => el.temperament) 
    .filter((temperament) => temperament !== undefined) 
    .flatMap((temperament) => temperament.split(", ")) 
    .map((temperament) => temperament.trim()) 
    .filter((value, index, self) => self.indexOf(value) === index) 
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) 
    .map((temperament) => ({ name: temperament })); 

  await Temperament.bulkCreate(temperaments);
};

/*const postTemperament = async (req, res) => {
  const { name } = req.body;

  try {
    // Validar si el temperamento ya existe en la base de datos
    const existingTemperament = await Temperament.findOne({
      where: { name },
    });

    if (existingTemperament) {
      return res.status(409).json({ error: "El temperamento ya existe" });
    }*/

module.exports = {
  getTemperamentsFromApi,
};
