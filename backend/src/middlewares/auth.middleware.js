import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token =
            req.cookies?.jwtToken ||
            (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]);

        if (!token) {
            return res.status(401).send("Unauthorized").json({
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        if (!decoded || !decoded._id) {
            return res.status(401).json({
                status: "Unauthorized",
                message: "Invalid or malformed token",
            });
        }

        const user = await User.findById(decoded?._id).select("-password -jwtToken");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            status: "INTERNAL_SERVER_ERROR",
            message: error.message,
        });
    }
});

export const findLoggedUser = asyncHandler(async (req, _, next) => {
    try {
        const authHeader = req.header("Authorization");

        const token =
            req.cookies?.jwtToken ||
            (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]);

        if (!token) {
            throw new ApiError(401, "Unauthorized: no token provided.");
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(decoded._id).select("-password -jwtToken");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid or expired token.");
    }
});
