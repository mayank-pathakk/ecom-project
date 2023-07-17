import express from 'express';
import {login, logout, register, sendOtpHash} from '../controller/signUpController';

const userRouter = express.Router();

userRouter.route('/auth/signin').post(sendOtpHash);
userRouter.route('/auth/register').post(register);
userRouter.route('/auth/login').post(login);
userRouter.route('/auth/logout').get(logout);

export default userRouter;
