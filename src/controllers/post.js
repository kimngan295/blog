import { Post, addPost, deletePost } from '../models/post.js';
import HttpStatus from 'http-status-codes';

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const createNewPost = async (req, res) => {
  try {
    const { title, author, content } = req.body;

    const newPost = {
      title: title,
      author: author,
      content: content
    }

    const post = await addPost(newPost);

    if (post) {
      return res.status(HttpStatus.CREATED).json({ message: 'Success!', success: true })
    }
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message, success: false })
  }
}

export const deletedPost = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID is required in the request body" });
    }
    const deletedPost = await deletePost(id)

    if (deletedPost) {
      return res.status(HttpStatus.CREATED).json({ message: 'Deleted successfully!', success: true })
    }

  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message, success: false })
    
  }
}