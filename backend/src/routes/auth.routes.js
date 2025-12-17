import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { loginUser } from "../controller/public.controller.js";

const router = Router();

router.route("/logout").post(verifyJwt, loginUser);

export default router;
