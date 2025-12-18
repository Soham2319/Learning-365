import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        course_name: {
            type: String,
            required: true,
            trim: true,
        },

        course_description: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        course_duration: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Course = mongoose.model("Product", courseSchema);
