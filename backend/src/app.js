import express from "express";
import cookieParser from "cookie-parser";

// routes
import publicRoute from "./routes/public.routes.js";
import userRoute from "./routes/user.routes.js";
import authRoute from "./routes/auth.routes.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

export const BASE_API = "/api/v1";

// public controller - routes
app.use(`${BASE_API}/public`, publicRoute);

// user controler - routes
app.use(`${BASE_API}/user`, userRoute);

// auth routes
app.use(`${BASE_API}/auth`, authRoute);

export { app };
