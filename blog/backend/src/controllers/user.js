import HttpStatus from 'http-status-codes';
import { addUser, getAllUser } from '../models/user.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUser();
        res.status(HttpStatus.OK).json(users);
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message, success: false })
    }
}
