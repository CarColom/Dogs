const { Dog, Temperament } = require("../db");
const axios = require("axios");

const getDogDB = async () => {
  const allDogs = await Dog.findAll();
  return allDogs;
};

const getDogApi = async () => {
  const getApi = (await axios.get("https://api.thedogapi.com/v1/breeds")).data;
  const apiInfoMap = await getApi.map((dog) => {
    let heightArr = [];
    let weightArr = [];
    let temperament = [];
    if (dog.height.metric) {
      heightArr = dog.height.metric.split(" - "); 
    }
    if (dog.weight.metric) {
      weightArr = dog.weight.metric.split(" - "); 
    }
    if (dog.temperament) {
      temperament = dog.temperament.split(", "); 
    }
    return {
      id: dog.id,
      name: dog.name,
      height: heightArr,
      weight: weightArr,
      temperaments: temperament,
      life_span: dog.life_span,
      image: dog.image.url,
    };
  });
  return apiInfoMap;
};

const getAllDogs = async (name) => {
  const dogDB = await getDogDB(); // todos los perros de la base de datos
  const dogApi = await getDogApi(); // todos los perros de la API
  const allDogs = [...dogDB, ...dogApi]; // todos los perros

  if (name) {
    const filterDogs = allDogs.filter((d) => {
      if (d.name.toLowerCase().includes(name.toLowerCase())) {
        return d;
      }
    });

    if (filterDogs.length <= 0) {
      throw new Error("Error: there is no such dog");
    } else {
      return filterDogs;
    }
  } else {
    return allDogs;
  }
};


const getDogById = async (idRaza) => {
  const allDogs = await getAllDogs(); 

  const dog = allDogs.find((d) => d.id.toString() === idRaza);
  return dog;
};

const createDogDB = async (
  name,
  height_min,
  height_max,
  weight_min,
  weight_max,
  lifeTime,
  image,
  temperament
) => {
  // Validacion 
  if (
    !name ||
    !height_min ||
    !height_max ||
    !weight_min ||
    !weight_max ||
    !lifeTime ||
    !image ||
    !temperament
  ) {
    throw new Error("Error: Debes completar todos los campos");
  }

  // Crear dog en BD
  const dog = await Dog.create({
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span: lifeTime,
    image: image,
  });

  // Relacion perro y temperamento
  const temperamentToAssociate = await Temperament.findOne({
    where: {
      name: temperament,
    },
  });

  await dog.addTemperament(temperamentToAssociate);

  return dog;
};

const deleteDogById = async (id) => {
  await Dog.destroy({ where: { id: id } });
};


module.exports = {
  createDogDB,
  getDogById,
  getAllDogs,
  deleteDogById,
};
