import { Course } from "../models/course.model";
import { asyncHandler } from "../utils/asyncHandler";

export const addCourse = asyncHandler(async (req, res) => {
    const { course_name, course_description, image, course_duration } = req.body;

    if (
        [course_name, course_description, image, course_duration].some(
            (filed) => !filed || filed.trim() === ""
        )
    ) {
        return res.status(404).json({
            status: "BAD_REQUEST",
            error_message: "required all fileds",
        });
    }

    const course = await Course.create({
        //TODO: priviously create this
    });
});

export const getAllCourse = asyncHandler(async (_, res) => {
    const course = await Course.find();

    if (!course) {
        return res.status(404).json({
            status: "NOT_FOUND",
            error_message: "no course will be fond.",
        });
    }

    return res.status(200).json({
        status: "OK",
        coruse: course,
    });
});
