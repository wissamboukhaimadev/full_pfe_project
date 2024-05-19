import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IAmphieData } from "../utils/types/body_data_type"
import { validate_amphie_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"
import { getDataForDate } from "../utils/chart_filters/functions_amphie"
import { Socket } from "socket.io"
import { TDate } from "../utils/types/chart_type"


const prisma = new PrismaClient()


export const getAmphi_data = async (req: Request, res: Response) => {
    const data: TDate = req.body
    const amphie_data = await prisma.amphie.findMany({})

    res.send(amphie_data)
}

export const insertAmphi_data = async (req: Request, res: Response) => {
    const data: IAmphieData = req.body;
    const valid_data = validate_amphie_data(data)
    if (valid_data) {
        const data_inserted = await prisma.amphie.create({
            data
        })
        console.log(data_inserted)
        io.emit("inserted_amphie_data", data_inserted);
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}


