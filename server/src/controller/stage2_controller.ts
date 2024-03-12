import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IStage2Data } from "../utils/types/body_data_type"
import { validate_stage_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"


const prisma = new PrismaClient()

export const getStage2_data = async (req: Request, res: Response) => {
    const stage2_data: IStage2Data[] = await prisma.stage2.findMany()
    res.send(stage2_data)
}


export const insertStage2_data = async (req: Request, res: Response) => {
    const data: IStage2Data = req.body
    const validate_data: boolean = validate_stage_data(data)
    if (validate_data) {
        const data_inserted: IStage2Data = await prisma.stage2.create({ data })
        io.emit("inserted_stage2_data", data_inserted)
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}
