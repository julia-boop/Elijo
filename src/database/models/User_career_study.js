module.exports = (sequelize, dataTypes) => {
    const alias = 'User_career_study';
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
          },
          career_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
          },
          user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
          }
    };
    const config = {
        tableName: 'user_career_studies',
        timestamps: true,
        underscored: true
    };
    const User_career_study = sequelize.define(alias, cols, config);  
    
    return User_career_study;
}