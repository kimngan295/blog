import { DataTypes } from 'sequelize';
import sequelize from '../config/connectDB.js';


// Định nghĩa mô hình "Post"
export const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},{
    sequelize,
    modelName: 'Post'
});


export async function addPost(data){
    try {
        const post = await Post.create(data);
        console.log('Add new post successully', post.toJSON())
        return post
    } catch (error) {
        throw new Error(error.message)
    }
};

export async function deletePost(postId){
    try {
        const post = await Post.destroy({
            where: {
                id: postId
            }
        });
        console.log('Delete post successully')
        return post
    } catch (error) {
        throw new Error(error.message)
    }

}