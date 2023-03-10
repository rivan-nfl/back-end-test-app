import express from 'express';
import { register } from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', register);

export default authRouter;