import { Router } from "express";
import { findLoggedUser, verifyJwt } from "../middlewares/auth.middleware.js";
import { getUserDetails } from "../controller/user.controller.js";

const router = Router();

router.route("/user-details").get(verifyJwt, findLoggedUser, getUserDetails);

export default router;
