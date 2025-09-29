import express, { Router } from "express"
import userRouter from "./routers/user.router.js"
const app = express()
app.set("port", 3000)
app.use(express.json())
app.listen(app.get("port"))
app.use("/user", userRouter)