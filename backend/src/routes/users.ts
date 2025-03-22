import express from 'express';
import { checkValidateUserLogin, checkValidateUserRegister, loginUser, registerUser } from '../controllers/userController';


const router = express.Router();

//auth
router.post("/register", checkValidateUserRegister, registerUser);
router.post("/login", checkValidateUserLogin, loginUser);


export default router;

