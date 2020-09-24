module.exports = (sequelize, dataTypes) => {
    const alias = 'Asignature';
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
          type: dataTypes.STRING(60),
          allowNull: false
        },
        carrer_id:{
          type: dataTypes.INTEGER(10).UNSIGNED,
          allowNull: false
        }
    };
    const config = {
        tableName: 'asignatures',
        timestamps: true,
        underscored: true
    };
    
    const Asignature = sequelize.define(alias, cols, config);  
    
    Asignature.associate = function(models) {
        Asignature.belongsTo(models.Carrer, {
            as: 'carrer',
            foreignKey: 'carrer_id'
        });
    };

    return Asignature;
}