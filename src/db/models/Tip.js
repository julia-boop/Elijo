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
  
  Tip.associate = function(models) {
    Tip.belongsTo(models.Course, {
      as: 'Course',
      foreignKey: 'course_id'
    });

    Tip.belongsTo(models.Carrer, {
      as: 'Carrer',
      foreignKey: 'carrer_id'
    });

    Tip.belongsTo(models.Institute, {
      as: 'Institute',
      foreignKey: 'institute_id'
    });

    Tip.belongsTo(models.University, {
      as: 'University',
      foreignKey: 'university_id'
    });

    Tip.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'user_id'
    });
  };

  return Tip;
}