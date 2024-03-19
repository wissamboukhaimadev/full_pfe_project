"use client"

import { CardsThirdFloor } from "@/components/custom/CardsThirdFloor";
import { NavBar } from "@/components/custom/NavBar";
import { SideNav } from "@/components/custom/SideNav";
import { ChartStage3 } from "@/components/custom/versions/charts/ChartStage3";
import { OptionMenuHistoryStage3 } from "@/components/custom/versions/select_date/OptionMenuStage3";
import { IStageData } from "@/utils/db_types";
import { TChartLabels } from "@/utils/types_app";
import { useEffect, useState } from "react";

import io, { Socket } from "socket.io-client"

const socket: Socket = io("ws://localhost:4000")

export default function ThirdFloor() {

    const [stage3_data, setStage3_data] = useState<IStageData>({})
    const [chartLabel, setChartLabel] = useState<TChartLabels>("daily")


    useEffect(() => {

        socket.on("inserted_stage3_data", (data: IStageData) => {
            localStorage.setItem("latest_stage3", JSON.stringify(data))
            // @ts-ignore
            setStage3_data(JSON.parse(localStorage.getItem("latest_stage3")))
        })
        if (localStorage.getItem("latest_stage3")) {
            //@ts-ignore
            setStage3_data(JSON.parse(localStorage.getItem("latest_stage3")))
        }

    }, [])
    return (
        <main >
            <NavBar />
            <div className="flex ">
                <div className="w-20 ">
                    <SideNav />
                </div>
                <div className="mx-28 mt-10 w-full" >


                    <CardsThirdFloor {...stage3_data} />

                    <div className="mt-10 ">
                        <OptionMenuHistoryStage3 socket={socket} setChartLabel={setChartLabel} />
                    </div>

                    <ChartStage3 socket={socket} chartLabel={chartLabel} />
                </div>
            </div>
        </main>
    )
}