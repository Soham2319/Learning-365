import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getLoggedUser } from "../utils/constance.js";

export const getUserDetails = asyncHandler(async (req, res) => {
    try {
        const userEmail = getLoggedUser(req);

        if (!userEmail) {
            return res.status(401).json({
                status: "FORBIDDEN",
                error_message: "User unauthorized.",
            });
        }

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            console.error("User found");

            return res.status(404).json({
                status: "NOT_FOUND",
                error_message: "User not found.",
            });
        }

        return res.status(200).json({
            user_details: user,
        });
    } catch (e) {}
});
