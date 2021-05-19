'use strict'

const {Model, DataTypes} = require('sequelize')
const bcrypt = require('bcryptjs');

module.exports = (sequelize) =>{
    class User extends Model{}
    User.init({
        firstName:{
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notNull: {
                  msg: 'A first name is required'
                },
                notEmpty: {
                  msg: 'Please provide a first name'
                }
              } 
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    msg:"Please provide a last name"
                },
                notEmpty:{
                    msg:"Please provide a last name"
                } 
            }
        },
        emailAddress:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    msg:"Please provide an email"
                },
                notEmpty:{
                    msg:"Please provide an email"
                } 
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    msg:"Please provide a password"
                },
                notEmpty:{
                    msg:"Please provide a password"
                } 
            }
        }
    }, {sequelize});

    User.associate = (models) =>{
        User.hasMany(models.Course, {
            foreignKey:{
                fieldName:"userId",
                allowNull:false
            }
        });
    };

    return User;
}