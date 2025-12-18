import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { options } from "../utils/constance.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { full_name, email, stream, password } = req.body;

    if ([full_name, email, password].some((field) => !field || field.trim() == "")) {
        return res.status(400).json({
            status: "BAD_REQUEST",
            error_message: "All fileds are require.",
        });
    }

    const exitsUser = await User.findOne({ email });

    if (exitsUser) {
        console.error("Email already exits.");

        return res.status(400).json({
            status: "BAD_REQUEST",
            error_message: "Email already exits",
        });
    }

    const user = await User.create({
        full_name,
        stream,
        email,
        password,
    });

    const createUser = await User.findById(user._id).select("-password");

    if (!createUser) {
        console.error("user not get from the databse.");

        return res.status(500).jons({
            status: "INTERNAL_SERVER_ERROR",
            error_message: "Something went wrong on server",
        });
    }

    return res.status(200).json({
        message: "User regsiter successfully.",
        userData: createUser,
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log("email and password filed are empty.");

        return res.status(400).json({
            status: "BAD_REQUEST",
            error_message: "All filed are required.",
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        console.error("user not found");

        return res.status(404).json({
            status: "NOT_FOUND",
            error_messge: "User not found",
        });
    }

    const isValidPassword = await user.isPasswordCorrect(password);

    if (!isValidPassword) {
        console.error("Password in valid.");
        return res.status(401).json({
            status: "FORBIDDEN",
            error_message: "Password invalid.",
        });
    }

    const jwtToken = user.generateJwtToken();

    user.jwtToken = jwtToken;
    await user.save({ validateBeforeSave: false });

    const loggedUser = await User.findById(user._id).select("-password -jwtToken");

    return res.status(200).cookie("jwtToken", jwtToken, options).json({
        status: 200,
        message: "User login successfully",
        user: loggedUser,
        token: jwtToken,
    });
});
