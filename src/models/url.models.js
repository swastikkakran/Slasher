import mongoose, { model, Schema } from "mongoose";

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