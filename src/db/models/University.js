module.exports = (sequelize, dataTypes) => {
  const alias = 'University';
  const cols = {
    id:{
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: dataTypes.STRING(255)
    },
    acronym:{
      type: dataTypes.STRING(100)
    },
    link:{
      type: dataTypes.STRING(255)
    },
    price:{
      type: dataTypes.INTEGER(10)
    },
    calification:{
      type: dataTypes.INTEGER(10)
    },
    adress:{
      type: dataTypes.STRING(255)
    },
    location:{
      type: dataTypes.STRING(255)
    },
    region:{
      type: dataTypes.STRING(255)
    },
    logo:{
      type: dataTypes.STRING(100)
    },
    amount_students:{
      type: dataTypes.INTEGER(10)
    }
  };
  const config = {
    tableName: 'universities',
    timestamps: true,
    underscored: true
  };
  const University = sequelize.define(alias, cols, config);  
  
  University.associate = function(models) {
    University.belongsToMany(models.Career, {
      as: 'University_career',
      through: 'universities_careers',
      foreignKey: 'university_id',
      otherKey: 'career_id',
      timestamps: true
    });
    University.belongsToMany(models.User, {
        as: 'User',
        through: 'tips',
        foreignKey: 'university_id',
        otherKey: 'user_id',
        timestamps: true
    });
  };
  return University;
}