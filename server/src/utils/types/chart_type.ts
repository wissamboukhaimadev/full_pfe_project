type Settings = 'daily' | 'monthly' | 'yearly';

export interface IChartData {
    currentDate: Date,
    settings: Settings
}
export interface IChartDataClient {
    day: number,
    month: number,
    year: number,
    settings: Settings
}

export type TDate = {
    year: number,
    month: number,
    day: number
}