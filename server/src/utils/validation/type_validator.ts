import { IAmphieData, IStage1Data } from "../types/body_data_type";

export const validate_amphie_data = (data: IAmphieData) => {
    if ((data.temperature && typeof data.temperature === "string") && (data.co2_gaz &&
        typeof data.co2_gaz === "string") && (data.humidity && typeof data.humidity === "string")) {
        return true;
    } else {
        return false
    }
}



export const validate_stage_data = (data: IStage1Data) => {
    if ((data.current && typeof data.current === "string") && (data.tension &&
        typeof data.tension === "string") && (data.power && typeof data.power === "string")
        && (data.energy && typeof data.energy === "string")
    ) {
        return true;
    } else {
        return false
    }
}


