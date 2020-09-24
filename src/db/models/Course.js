module.exports = (sequelize, dataTypes) => {
  const alias = 'Course';
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
    tableName: 'courses',
    timestamps: true,
    underscored: true
  };
  const Course = sequelize.define(alias, cols, config);  
  
  Course.associate = function(models) {
    Course.belongsToMany(models.Institute, {
      as: 'Institute_course',
      through: 'institutes_courses',
      foreignKey: 'course_id',
      otherKey: 'institute_id',
      timestamps: true
    });

    Course.belongsToMany(models.User, {
      as: 'User',
      through: 'User_course_study',
      foreignKey: 'course_id',
      otherKey: 'user_id',
      timestamps: true
    });

    //FALTA ASOCIAR CON TIPS
  };
  
  return Course;
}