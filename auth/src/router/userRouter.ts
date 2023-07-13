import express from 'express';
import exampleController from '../controller/signUpController';

const userRouter = express.Router();

userRouter.route('/auth/signup').get(exampleController);

export default userRouter;
