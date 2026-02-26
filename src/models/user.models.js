import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    fullName: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpiry: {
        type: Date
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    }
}, {timestamps: true})


userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex")

    const tokenExpiry = Date.now() + (20*60*1000);
    return { unHashedToken, hashedToken, tokenExpiry }
}


export const User = mongoose.model("User", userSchema);