module.exports = (sequelize, dataTypes) => {
    const alias = 'User_study';
    const cols = {
        id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            }
        },
        university_career_id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
              model: 'universities_careers',
              key: 'id'
            }
        },
        institute_course_id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
              model: 'institutes_courses',
              key: 'id'
            }
        }
    };
    const config = {
        tableName: 'user_studies',
        timestamps: true,
        underscored: true
    };
    const User_study = sequelize.define(alias, cols, config);  
    
    return User_study;
}