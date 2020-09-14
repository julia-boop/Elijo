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
            through: 'Institute_course',
            foreignKey: 'course_id',
            otherKey: 'institute_id',
            timestamps: true
        });
    };
    return Course;
}