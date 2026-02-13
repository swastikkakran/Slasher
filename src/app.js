import express from "express";
import cors from "cors";

const app = express()

//basic express config
app.use(express.json({ limit:"16kb" }))
app.use(express.urlencoded({ extended:true, limit:"16kb" }))
app.use(express.static("public"))

//cors config
app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(","),
    credentials:true,
    methods:["GET", "POST", "DELETE", "PATCH", "OPTIONS", "PUT"],
    allowedHeaders:["Authorization", "Content-Type"]
}))

app.get("/", (req, res) => {
    res.send("App is working...")
})

export default app