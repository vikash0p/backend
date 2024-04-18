import express from 'express'
import { Login, Logout, Register, VerifyToken, getUser } from '../controller/UserController.js';

const route = express.Router();
route.post('/register', Register);
route.post ('/login', Login);
route.get('/user', VerifyToken, getUser);

route.post('/logout',VerifyToken, Logout)
export default route;