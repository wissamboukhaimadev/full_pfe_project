import express, { Request, Response } from "express"
import cors from "cors"
import router from "./routes/route"
import { app, httpServer, io } from "./server/socket"
import { Socket } from "socket.io"



app.use(cors())
app.use(express.json())
app.use("/api/v1", router)



app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello world")
})


const port = process.env.PORT;
httpServer.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})