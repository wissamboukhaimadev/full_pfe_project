import express, { Request, Response } from "express"
import cors from "cors"
import router from "./routes/route"
import { app, httpServer, io } from "./server/socket"
import { Socket } from "socket.io"
import { chartFunction } from "./controller/chart_data"
import { IChartData } from "./utils/types/chart_type"



app.use(cors())
app.use(express.json())
app.use("/api/v1", router)



app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello world")
})

io.on("connection", (socket: Socket) => {
  socket.on("amphie_chart_data", async (something: IChartData) => {
    something.currentDate = new Date(something.currentDate)
    const data = await chartFunction(something)
    console.log(data)
    socket.emit("amphie_chart_data_update", data)

  })

})

const port = process.env.PORT;
httpServer.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})