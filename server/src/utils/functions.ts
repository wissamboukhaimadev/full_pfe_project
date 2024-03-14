import { PrismaClient } from "@prisma/client";
import { startOfDay } from "date-fns"
import { TDate } from "./types/chart_type";


const prisma = new PrismaClient()



export async function getDataForDate({ year, month, day }: TDate) {
    try {
        const startDate = startOfDay(new Date(year, month - 1, day));
        const endDate = startOfDay(new Date(year, month - 1, day + 1));

        const data = await prisma.amphie.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,

                },
            },
        });

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving data for the date.');
    } finally {
        await prisma.$disconnect();
    }
}

export async function getDataForMonth({ year, month, day }: TDate) {
    try {
        const startDate = startOfDay(new Date(year, month - 1, day));
        const endDate = startOfDay(new Date(year, month, day));

        const data = await prisma.amphie.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving data for the date.');
    } finally {
        await prisma.$disconnect();
    }
}
export async function getDataForYear({ year, month, day }: TDate) {
    try {
        const startDate = startOfDay(new Date(year - 1, month, day));
        const endDate = startOfDay(new Date(year, month, day));

        const data = await prisma.amphie.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving data for the date.');
    } finally {
        await prisma.$disconnect();
    }
}

