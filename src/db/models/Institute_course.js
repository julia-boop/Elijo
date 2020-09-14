module.exports = (sequelize, dataTypes) => {
    const alias = 'Institute_course';
    const cols = {
        id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        institute_id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        course_id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        }
    };

    const config = {
        tableName: 'institutes_courses',
        timestamps: true,
        underscored: true
    };
    
    const Institute_course = sequelize.define(alias, cols, config);  
    
    return Institute_course;
}