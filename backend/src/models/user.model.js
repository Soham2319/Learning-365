import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            require: true,
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

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwtToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            full_name: this.full_name,
        },
        process.env.JWT_TOKEN,
        { expiresIn: process.env.TOKEN_EXPIRY }
    );
};

export const User = mongoose.model("User", userSchema);
