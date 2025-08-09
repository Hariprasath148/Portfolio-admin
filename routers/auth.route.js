import express from "express";
import {signUp , logIn , logOut, getUser } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/signUp",signUp);
router.post("/logIn",logIn);
router.post("/LogOut",logOut);
router.get("/getUser",protectRoute,getUser);

export default router;