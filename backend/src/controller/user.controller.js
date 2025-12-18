import { Course } from "../models/course.model.js";
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
    } catch (e) {
        return res.status(200).json({
            status: "INTERNAL_SERVER_ERROR",
            error_message: e.message,
        });
    }
});

export const enrollCourse = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const userEmail = getLoggedUser(req);
    const exitsUser = await User.findOne({ email: userEmail }).select("-password -jwtToken");

    const course = await Course.findOne({ _id: id });

    if (!course) {
        return res.status(404).json({
            status: "NOT_FOUND",
            error_message: "course not found",
        });
    }

    const alreadyEnrollCourse = exitsUser.enroll_curse.includes(course._id);
    if (alreadyEnrollCourse) {
        return res.status(400).json({
            status_code: 400,
            error_message: "Course already exits",
        });
    }

    exitsUser.enroll_curse.push(course._id);

    await exitsUser.save();

    return res.status(200).json({
        status: "SUCCESS",
        enroll_course: exitsUser.enroll_course,
    });
});
