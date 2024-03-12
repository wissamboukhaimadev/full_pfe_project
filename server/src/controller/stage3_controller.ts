import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IStage3Data } from "../utils/types/body_data_type"
import { validate_stage_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"



const prisma = new PrismaClient()
export const getStage3_data = async (req: Request, res: Response) => {
    const stage3_data: IStage3Data[] = await prisma.stage3.findMany()
    res.send(stage3_data)
}


export const insertStage3_data = async (req: Request, res: Response) => {
    const data: IStage3Data = req.body
    const validate_data: boolean = validate_stage_data(data)
    if (validate_data) {
        const data_inserted: IStage3Data = await prisma.stage3.create({ data })
        io.emit("inserted_stage3_data", data_inserted)
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}