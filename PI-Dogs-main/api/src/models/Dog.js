const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID, // alfanumerico
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //no puede estar vacio
        unique: true,
      },
      height_min: {
        type: DataTypes.INTEGER, //entero
        allowNull: false,
      },

      height_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      weight_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      life_span: {
        type: DataTypes.INTEGER,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
        isUrl: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
