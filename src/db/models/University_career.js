module.exports = (sequelize, dataTypes) => {
    const alias = 'University_carrer';
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        university_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        career_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        }
    };

    const config = {
        tableName: 'universities_careers',
        timestamps: true,
        underscored: true
    };
    
    const University_carrer = sequelize.define(alias, cols, config);  
    
    return University_carrer;
}