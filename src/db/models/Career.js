module.exports = (sequelize, dataTypes) => {
  const alias = 'Career';
  const cols = {
    id:{
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: dataTypes.STRING(255)
    },
    plan_link:{
      type: dataTypes.STRING(255)
    },
    price:{
      type: dataTypes.INTEGER(10)
    },
    calification:{
      type: dataTypes.INTEGER(10)
    }
  };
  const config = {
    tableName: 'careers',
    timestamps: true,
    underscored: true
  };
  const Career = sequelize.define(alias, cols, config);  
  
  Career.associate = function(models) {
    Career.belongsToMany(models.University, {
      as: 'University_career',
      through: 'universities_careers',
      foreignKey: 'career_id',
      otherKey: 'university_id',
      timestamps: true
    });
    Career.belongsToMany(models.User, {
      as: 'User',
      through: 'tips',
      foreignKey: 'career_id',
      otherKey: 'user_id',
      timestamps: true
    });
  };
  return Career;
}