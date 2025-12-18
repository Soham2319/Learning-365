import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { options } from "../utils/constance.js";

export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { jwtToken: undefined },
        },
        { new: true }
    );
    console.log("logout successfully");
    return res.status(200).clearCookie("jwtToken", options).json({
        status: 200,
        message: "User logout successfully",
    });
});
