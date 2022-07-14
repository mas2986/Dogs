const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMin:{
      type:DataTypes.INTEGER,
      allowNull:false,
      min:0
    },  
    weightMax:{
      type:DataTypes.INTEGER,
      allowNull:false,
      min:0
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue: 'https://img.freepik.com/vector-gratis/lindo-perro-muerde-ilustracion-icono-vector-dibujos-animados-hueso-concepto-icono-naturaleza-animal-aislado-vector-premium-estilo-dibujos-animados-plana_138676-3743.jpg?w=800'
    },      
    heightMin:{
      type:DataTypes.INTEGER,  
      min:0     
    },
    heightMax:{
      type:DataTypes.INTEGER,  
      min:0     
    },    
    lifeSpanMin:{
      type:DataTypes.INTEGER, 
      min:0       
    },
    lifeSpanMax:{
      type:DataTypes.INTEGER,
      min:0        
    },
    createdDB:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    }
  },
  {
    timestamps:false
  });
};
