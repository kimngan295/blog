import { DataTypes } from 'sequelize';
import sequelize from '../config/connectDB.js';

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    rsa_public_key: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rsa_private_key: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'User'
});

export async function addUser(data) {
    try {
        const user = await User.create(data)
        console.log('User created successfully', user.toJSON())
        return user
    } catch (err) {
        throw err
    }
}

export async function findUserByEmail(email) {
    try {
        const user = await User.findOne({
            where: { email: email }
        });
        // console.log('User found successfully', user.toJSON())
        
        return user;
    } catch (error) {
        console.error("Error finding user by email:", error.message);
        throw error; 
    }
};

export async function getAllUser(){
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.error("Error finding user by email:", error.message);
        throw error; 
    }
}