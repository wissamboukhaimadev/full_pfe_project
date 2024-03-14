import { getDataForDate, getDataForMonth, getDataForYear } from "../utils/functions";
import { IChartData, TDate } from "../utils/types/chart_type";

export const chartFunction = async ({ currentDate, settings }: IChartData) => {
    const dateProp: TDate = {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear()
    }

    if (settings === "daily") {
        const data = await getDataForDate(dateProp)
        return data
    }
    if (settings === "monthly") {
        const data = await getDataForMonth(dateProp)
        return data
    }
    if (settings === "yearly") {
        const data = await getDataForYear(dateProp)
        return data
    }
}