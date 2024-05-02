import { Router } from 'express';
import { RouterAdmin } from './admin.js';
import { RouterBlog } from './blog.js';

let router = Router();

export const initAPIRoute = async (app) => {
    RouterAdmin(router);
    RouterBlog(router);
    app.use('/', router);
};

