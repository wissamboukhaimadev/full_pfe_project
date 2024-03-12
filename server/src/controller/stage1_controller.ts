import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IStage1Data } from "../utils/types/body_data_type"
import { validate_stage_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"


const prisma = new PrismaClient()


export const getStage1_data = async (req: Request, res: Response) => {
    const stage1_data: IStage1Data[] = await prisma.stage1.findMany()
    res.send(stage1_data)
}

export const insertStage1_data = async (req: Request, res: Response) => {
    const data: IStage1Data = req.body
    const validate_data: boolean = validate_stage_data(data)
    if (validate_data) {
        const data_inserted: IStage1Data = await prisma.stage1.create({ data })
        io.emit("inserted_stage1_data", data_inserted)
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}