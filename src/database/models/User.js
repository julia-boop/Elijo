module.exports = (sequelize, dataTypes) => {
  const alias = 'User';
  const cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: dataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    name:{
      type: dataTypes.STRING(255)
    },
    age: {
      type: dataTypes.DATE
    },
    telephone: {
      type: dataTypes.STRING(255)
    },
    experiences: {
      type: dataTypes.STRING(255)
    },
    province: {
      type: dataTypes.STRING(255)
    },
    genre_id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    photo:{
      type: dataTypes.STRING(100)
    },
    rol:{
      type: dataTypes.INTEGER(10),
      allowNull: false
    },
    user_confirm:{
      type: dataTypes.INTEGER(10),
      allowNull: false
    }
  };
  const config = {
    tableName: 'users',
    timestamps: true,
    underscored: true
  };
  const User = sequelize.define(alias, cols, config);  
  
  User.associate = function(models) {
    
    User.belongsToMany(models.Career, {
      as: 'User_careers',
      through: 'user_careers',
      foreignKey: 'user_id',
      otherKey: 'career_id',
      timestamps: true
    });
    
    User.belongsToMany(models.Course, {
      as: 'User_courses',
      through: 'user_courses',
      foreignKey: 'user_id',
      otherKey: 'course_id',
      timestamps: true
    });

    User.hasMany(models.Genre, {//NO ESTOY SEGURO DEL CAMBIO ESTE QUE HICE
      as: 'Genre',
      foreignKey: 'genre_id'
    });

    User.hasMany(models.Answer, {
      as: 'Answer',
      foreignKey: 'user_id'
    });

    User.belongsToMany(models.Interest, {
      as: 'Interest',
      through: 'user_interests',
      foreignKey: 'user_id',
      otherKey: 'interest_id',
      timestamps: true
    });

    User.belongsToMany(models.Notification, {
      as: 'Notification',
      through: 'user_notifications',
      foreignKey: 'user_id',
      otherKey: 'notification_id',
      timestamps: true
    });

    User.hasMany(models.Tip, {
      as: 'User_tips',
      foreignKey: 'user_id',
      timestamps: true
    });
    
    User.hasMany(models.Question, {
      as: 'User_question',
      foreignKey: 'user_id',
      timestamps: true
    });
    
    User.hasMany(models.Calification, {
      as: 'User_calification',
      foreignKey: 'user_id',
      timestamps: true
    });
    
  };
  
  return User;
}