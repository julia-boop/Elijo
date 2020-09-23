module.exports = (sequelize, dataTypes) => {
    const alias = 'User_carrer_study';
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
          user_studies_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
              model: 'user_studies',
              key: 'id'
            }
          },
    };
    const config = {
        tableName: 'user_carrer_studies',
        timestamps: true,
        underscored: true
    };
    const User_carrer_study = sequelize.define(alias, cols, config);  
    
    return User_carrer_study;
}