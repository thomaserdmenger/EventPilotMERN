import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import "dotenv/config"

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

await mongoose.connect(process.env.MONGODB_URI, { dbName: "EventPilot" })
const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Server listens on port: ${PORT}`))
