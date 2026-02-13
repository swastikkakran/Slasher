import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path:"./.env"
})

const port = process.env.PORT || 3000

connectDB()
.then(app.listen(port, () => {
    console.log(`app is listening on http://localhost:${port}`)
}))

.catch((err) => {
    console.log("error while connecting to mongoDB...")
    process.exit()
})