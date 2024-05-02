import testEJS from '../controllers/admin/controllerAdmin.js';
import { registerUser } from '../controllers/register.js';
import { loginUser } from '../controllers/login.js';
import { getAllPost, createNewPost, deletedPost } from '../controllers/post.js';


export const RouterAdmin = (router) =>
    router
        .get('/admin', testEJS)
        .post('/register', registerUser)
        .post('/login', loginUser)
        .get('/get-all-post', getAllPost)
        .post('/new-post', createNewPost)
        .post('/delete-post', deletedPost)
