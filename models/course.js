'use strict'

const {Model, DataTypes, ConnectionRefusedError} = require('sequelize')
const bcrypt = require('bcryptjs');

module.exports = (sequelize) =>{
    class Course extends Model{}
    Course.init({
        title:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Please provide a 'title'"
                },
                notNull:{
                    msg:"Please provide a 'title'"
                } 
            }
        },
        description:{
            type: DataTypes.TEXT,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Please provide a 'description'"
                },
                notNull:{
                    msg:"Please provide a 'description'"
                } 
            }
        },
        estimatedTime:{
            type: DataTypes.STRING
        },
        materialsNeeded:{
            type:DataTypes.STRING
        }

    }, {sequelize});

    Course.associate = (models) =>{
        Course.belongsTo(models.User, {
            foreignKey:{
                fieldName:"userId",
                allowNull:false,
                validate:{
                    notNull:{
                        msg:"Course owner cannot be blank"
                    },
                    notEmpty:{
                        msg:"Course owner cannot be blank"
                    }
                }   
            }
        })
    }

    return Course;
}

