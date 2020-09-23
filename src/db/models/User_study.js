module.exports = (sequelize, dataTypes) => {
    const alias = 'User_study';
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        career_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        },
        course_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        }
    };
    const config = {
        tableName: 'user_studies',
        timestamps: true,
        underscored: true
    };
    const User_study = sequelize.define(alias, cols, config);  
    
    User_study.associate = function(models) {
        User_study.belongsToMany(models.Career, {
          as: 'Career_study',
          through: 'user_career_studies',
          foreignKey: 'career_id',
          otherKey: 'user_studies_id',
          timestamps: true
        });

        User_study.belongsToMany(models.Course, {
            as: 'Course_study',
            through: 'User_course_study',
            foreignKey: 'course_id',
            otherKey: 'user_studies_id',
            timestamps: true
        });
        
        User_study.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'user_id',
            timestamps: true
        });
      };

    return User_study;
}