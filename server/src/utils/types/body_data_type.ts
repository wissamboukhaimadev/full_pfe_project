export interface IAmphieData {
    temperature: string,
    co2_gaz: string,
    humidity: string,
    createdAt?: Date

}

export interface IStage1Data {
    current: string,
    tension: string,
    puissance_active: string,
    puissance_reactive: string,
    puissance_apparente: string,
    energy: string
    createdAt?: Date
}
export interface IStage2Data {
    current: string,
    tension: string,
    puissance_active: string,
    puissance_reactive: string,
    puissance_apparente: string,
    energy: string
    createdAt?: Date
}
export interface IStage3Data {
    current: string,
    tension: string,
    puissance_active: string,
    puissance_reactive: string,
    puissance_apparente: string,
    energy: string
    createdAt?: Date
}