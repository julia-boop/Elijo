module.exports = (sequelize, dataTypes) => {
  const alias = 'Tip';
  const cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    university_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    career_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    institute_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    course_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    user_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  };
  
  const config = {
    tableName: 'tips',
    timestamps: true,
    underscored: true
  };
  
  const Tip = sequelize.define(alias, cols, config);  
  
  return Tip;
}