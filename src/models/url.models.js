import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
    {
        originalUrl: {
            type: String
        },
        shortCode: {
            type: String,
            unique: true
        },
        user: {
            type: Schema.ObjectId,
            ref: "User",
            required: true
        },
        clicks: {
            type: Number,
            default: 0
        }
    },
    {
timeStamps: true
    }
);

export const Url = mongoose.model("Url", urlSchema)