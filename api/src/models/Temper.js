const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('temperament',{        
        name:{
            type: DataTypes.STRING(50),
            allowNull:false
        }
    },
    {
        timestamps:false
    })
}