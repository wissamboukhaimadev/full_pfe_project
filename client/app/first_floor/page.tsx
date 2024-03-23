"use client"
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"

import { CardsFirstFloor } from "@/components/custom/versions/cards/CardsFirstFloor";
import { ChartStage1 } from "@/components/custom/versions/charts/ChartStage1";
import { NavBar } from "@/components/custom/NavBar";
import { SideNav } from "@/components/custom/SideNav";
import { IStageData } from "@/utils/db_types";
import { TChartLabels } from "@/utils/types_app";
import { OptionMenuHistoryStage1 } from "@/components/custom/versions/select_date/OptionMenuStage1";



const socket: Socket = io("ws://localhost:4000/")

export default function GEDepartment() {

    const [stage1_data, setStage1_data] = useState<IStageData>({})
    const [chartLabel, setChartLabel] = useState<TChartLabels>("daily")


    useEffect(() => {

        socket.on("inserted_stage1_data", (data: IStageData) => {
            localStorage.setItem("latest_stage1", JSON.stringify(data))
            // @ts-ignore
            setStage1_data(JSON.parse(localStorage.getItem("latest_stage1")))
        })
        if (localStorage.getItem("latest_stage1")) {
            //@ts-ignore
            setStage1_data(JSON.parse(localStorage.getItem("latest_stage1")))
        }
        return () => {
            socket.off("inserted_stage1_data")
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


                    <CardsFirstFloor {...stage1_data} />
                    <div className="mt-10 ">
                        <OptionMenuHistoryStage1 socket={socket} setChartLabel={setChartLabel} />
                    </div>

                    <ChartStage1 socket={socket} chartLabel={chartLabel} />
                </div>
            </div>
        </main>
    )
}