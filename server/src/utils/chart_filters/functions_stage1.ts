import { PrismaClient } from "@prisma/client";
import { startOfDay } from "date-fns"
import { TDate } from "../types/chart_type";
import { IStage1Data } from "../types/body_data_type";


const prisma = new PrismaClient()

interface IStage1DataNumbers {
    current: number,
    tension: number,
    power: number,
    energy: number,
    createdAt?: Date

}

type TDayMonthYear = {
    [time: string]: IStage1DataNumbers,
}


export async function getDataForDate({ year, month, day }: TDate) {
    console.log(`stage1 daily`)
    try {
        const startDate = startOfDay(new Date(year, month - 1, day));
        const endDate = startOfDay(new Date(year, month - 1, day + 1));
        let average_data: TDayMonthYear = {}
        let average_data_count: TDayMonthYear = {}

        const data = await prisma.stage1.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,

                },
            },
        });

        data.forEach(({ createdAt, current, tension, power, energy }) => {
            let date = new Date(createdAt)
            let hour = date.getHours().toString()

            if (!average_data[hour]) {
                average_data[hour] = {
                    current: 0,
                    tension: 0,
                    power: 0,
                    energy: 0,
                }
                average_data_count[hour] = {
                    current: 0,
                    tension: 0,
                    power: 0,
                    energy: 0,
                }
            }

            average_data[hour].current += parseInt(current)
            average_data[hour].tension += parseInt(tension)
            average_data[hour].power += parseInt(power)
            average_data[hour].energy += parseInt(energy)

            average_data_count[hour].current += 1
            average_data_count[hour].tension += 1
            average_data_count[hour].power += 1
            average_data_count[hour].energy += 1


        })

        const allHours = Array.from({ length: 23 }, (_, index) => index.toString())

        const result: IStage1Data[] = allHours.map(hour => {
            const averageCurrent = average_data[hour] ? average_data[hour].current / average_data_count[hour].current : 0
            const averageTension = average_data[hour] ? average_data[hour].tension / average_data_count[hour].tension : 0
            const averagePower = average_data[hour] ? average_data[hour].power / average_data_count[hour].power : 0
            const averageEnergy = average_data[hour] ? average_data[hour].energy / average_data_count[hour].energy : 0
            let final_result: IStage1Data = {
                current: averageCurrent.toString(),
                tension: averageTension.toString(),
                power: averagePower.toString(),
                energy: averageEnergy.toString(),

            }
            return final_result
        })
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving data for the date.');
    } finally {
        await prisma.$disconnect();
    }
}

export async function getDataForMonth({ year, month }: TDate) {
    console.log(`stage1 monthly`)

    try {
        const startDate = startOfDay(new Date(year, month - 1, 0));
        const endDate = startOfDay(new Date(year, month, 0));
        let average_data: TDayMonthYear = {}
        let average_data_count: TDayMonthYear = {}


        const data = await prisma.stage1.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        data.forEach(({ createdAt, current, tension, power, energy }) => {
            let date = new Date(createdAt)
            let day_week = date.getDay().toString()

            if (!average_data[day_week]) {
                average_data[day_week] = {
                    current: 0,
                    tension: 0,
                    power: 0,
                    energy: 0,
                }
                average_data_count[day_week] = {
                    current: 0,
                    tension: 0,
                    power: 0,
                    energy: 0,
                }
            }

            average_data[day_week].current += parseInt(current)
            average_data[day_week].tension += parseInt(tension)
            average_data[day_week].power += parseInt(power)
            average_data[day_week].energy += parseInt(energy)

            average_data_count[day_week].current += 1
            average_data_count[day_week].tension += 1
            average_data_count[day_week].power += 1
            average_data_count[day_week].energy += 1


        })

        const result: IStage1Data[] = Object.keys(average_data).map(day_week => {
            const averageCurrent = (average_data[day_week].current / average_data_count[day_week].current).toString()
            const averageTension = (average_data[day_week].tension / average_data_count[day_week].tension).toString()
            const averagePower = (average_data[day_week].power / average_data_count[day_week].power).toString()
            const averageEnergy = (average_data[day_week].energy / average_data_count[day_week].energy).toString()
            let final_result: IStage1Data = {
                current: averageCurrent,
                tension: averageTension,
                power: averagePower,
                energy: averageEnergy,

            }
            return final_result
        })

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving data for the date.');
    } finally {
        await prisma.$disconnect();
    }
}
export async function getDataForYear({ year }: TDate) {
    console.log(`stage1 yearly`)

    try {
        const startDate = startOfDay(new Date(year, 0, 0));
        const endDate = startOfDay(new Date(year + 1, 0, 0));
        let average_data: TDayMonthYear = {}
        let average_data_count: TDayMonthYear = {}

        const data = await prisma.stage1.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });
        data.forEach(({ createdAt, current, tension, power, energy }) => {
            let date = new Date(createdAt)
            let month = date.getMonth().toString()

            if (!average_data[month]) {
                average_data[month] = {
                    current: 0,
                    tension: 0,
                    power: 0,
                    energy: 0,
                }
                average_data_count[month] = {
                    current: 0,
                    tension: 0,
                    power: 0,
                    energy: 0,
                }
            }

            average_data[month].current += parseInt(current)
            average_data[month].tension += parseInt(tension)
            average_data[month].power += parseInt(power)
            average_data[month].energy += parseInt(energy)

            average_data_count[month].current += 1
            average_data_count[month].tension += 1
            average_data_count[month].power += 1
            average_data_count[month].energy += 1


        })

        const result: IStage1Data[] = Object.keys(average_data).map(month => {
            const averageCurrent = (average_data[month].current / average_data_count[month].current).toString()
            const averageTension = (average_data[month].tension / average_data_count[month].tension).toString()
            const averagePower = (average_data[month].power / average_data_count[month].power).toString()
            const averageEnergy = (average_data[month].energy / average_data_count[month].energy).toString()
            let final_result: IStage1Data = {
                current: averageCurrent,
                tension: averageTension,
                power: averagePower,
                energy: averageEnergy,

            }
            return final_result
        })

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving data for the date.');
    } finally {
        await prisma.$disconnect();
    }
}

