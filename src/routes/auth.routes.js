import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controller/auth.controller.js";

const router = Router();

router.route("/logout").post(verifyJwt, logoutUser);

export default router;
