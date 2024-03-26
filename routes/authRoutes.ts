import express, { Router } from "express";
import * as authController from "../controllers/authController";
import { registerValidationMiddleware, validateRegister } from '../middlewares/registerValidationMiddleware';
import { loginValidationMiddleware, validateLogin } from '../middlewares/loginValidationMiddleware';

const router: Router = express.Router();

router.post("/register",registerValidationMiddleware,validateRegister,authController.register);
router.post("/login-user",loginValidationMiddleware,validateLogin,authController.loginUser);

export default  router;
