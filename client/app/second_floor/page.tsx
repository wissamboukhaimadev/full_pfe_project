"use client"

import { CardsSecondFloor } from "@/components/custom/CardsSecondFloor";
import { NavBar } from "@/components/custom/NavBar";
import { SideNav } from "@/components/custom/SideNav";
import { ChartStage2 } from "@/components/custom/versions/charts/ChartStage2";
import { OptionMenuHistoryStage2 } from "@/components/custom/versions/select_date/OptionMenuStage2";
import { IStageData } from "@/utils/db_types";
import { TChartLabels } from "@/utils/types_app";
import { useEffect, useState } from "react";

import io from "socket.io-client"

const socket = io("ws://localhost:4000")


export default function SecondFloor() {

    const [stage2_data, setStage2_data] = useState<IStageData>({})
    const [chartLabel, setChartLabel] = useState<TChartLabels>("daily")


    useEffect(() => {

        socket.on("inserted_stage2_data", (data: IStageData) => {
            localStorage.setItem("latest_stage2", JSON.stringify(data))
            // @ts-ignore
            setStage2_data(JSON.parse(localStorage.getItem("latest_stage2")))
        })
        if (localStorage.getItem("latest_stage2")) {
            //@ts-ignore
            setStage2_data(JSON.parse(localStorage.getItem("latest_stage2")))
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


                    <CardsSecondFloor {...stage2_data} />

                    <div className="mt-10 ">
                        <OptionMenuHistoryStage2 socket={socket} setChartLabel={setChartLabel} />
                    </div>

                    <ChartStage2 socket={socket} chartLabel={chartLabel} />
                </div>
            </div>
        </main>
    )
}