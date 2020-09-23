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
    last_name:{
      type: dataTypes.STRING(255)
    },
    age: {
      type: dataTypes.DATE
    },
    telephone: {
      type: dataTypes.STRING(255)
    },
    adress:{
      type: dataTypes.STRING(255)
    },
    location: {
      type: dataTypes.STRING(255)
    },
    experiences: {
      type: dataTypes.STRING(255)
    },
    province: {
      type: dataTypes.STRING(255)
    },
    postal_code: {
      type: dataTypes.INTEGER(11)
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
    
    User.hasMany(models.User_study, {
      as: 'User_study',
      foreignKey: 'user_id'
    })
    
    User.belongsTo(models.Genre, {
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
      as: 'User_tip',
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