module.exports = (sequelize, dataTypes) => {
    const alias = 'Question';
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        univeristy_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        career_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        institute_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        course_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        text : {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        state : {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        answer_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        }

    };
    const config = {
        tableName: 'questions',
        timestamps: true,
        underscored: true
    };
    const Question = sequelize.define(alias, cols, config);  
    
    Question.associate = function(models) {
        Question.belongsTo(models.User, {
          as: 'User',
          foreignKey: 'user_id'
        });

        Question.belongsTo(models.Univerisity, {
            as: 'Univeristy',
            foreignKey: 'university_id'
        });

        Question.belongsTo(models.Career, {
            as: 'Career',
            foreignKey: 'career_id'
        });

        Question.belongsTo(models.Institute, {
            as: 'Institute',
            foreignKey: 'institute_id'
        });

        Question.belongsTo(models.Course, {
            as: 'Course',
            foreignKey: 'course_id'
        });
    
        Question.belongsTo(models.Answer, {
            as: 'Answer',
            foreignKey: 'answer_id'
        });
    };
    
    return Answer;
}