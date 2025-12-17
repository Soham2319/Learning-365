import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            require: true,
            trim: true,
        },

        last_name: {
            type: String,
            require: true,
            trim: true,
        },

        email: {
            type: String,
            require: true,
            unique: true,
        },

        password: {
            type: String,
            require: true,
            minlength: 6,
        },

        jwtToken: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);
