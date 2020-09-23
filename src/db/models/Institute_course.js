module.exports = (sequelize, dataTypes) => {
  const alias = 'Institute_course';
  const cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    institute_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    course_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    }
  };
  
  const config = {
    tableName: 'institutes_courses',
    timestamps: true,
    underscored: true
  };
  
  const Institute_course = sequelize.define(alias, cols, config);  
  
  Institute_course.associate = function(models) {
    Institute_course.belongsToMany(models.User, {
      as: 'User',
      through: 'institutes_courses',
      foreignKey: 'institute_course_id',
      otherKey: 'user_id',
      timestamps: true
    });
  };
  
  return Institute_course;
}