import express from "express";
import { login, register, resetPassword, sendSecurityQuestion } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)

router.post("/forgotPassword", sendSecurityQuestion);
router.post("/resetPassword", resetPassword);

export default router