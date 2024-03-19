"use client"

import { CardAmphie } from "@/components/custom/CardAmphi"
import { ChartAmphie } from "@/components/custom/versions/charts/ChartAmphie"
import { NavBar } from "@/components/custom/NavBar"
import { OptionMenuHistoryAmphie } from "@/components/custom/versions/select_date/OptionMenuAmphie"
import { SideNav } from "@/components/custom/SideNav"
import { IAmphieData } from "@/utils/db_types"
import { TChartLabels } from "@/utils/types_app"
import { useEffect, useState } from "react"

import io, { Socket } from "socket.io-client"


const socket: Socket = io("ws://localhost:4000")


export default function AmphiClass() {

    const [amphi_data, setAmphie_data] = useState<IAmphieData>({})
    const [chartLabel, setChartLabel] = useState<TChartLabels>("daily")


    useEffect(() => {
        socket.on("inserted_amphie_data", (data: IAmphieData) => {
            if (typeof window !== 'undefined') {

                localStorage.setItem("latest_amphie", JSON.stringify(data))
            }
            //@ts-ignore
            setAmphie_data(JSON.parse(localStorage.getItem("latest_amphie")))

            socket.emit("fetch_amphie_data")

        })
        if (localStorage.getItem("latest_amphie")) {
            //@ts-ignore
            setAmphie_data(JSON.parse(localStorage.getItem("latest_amphie")))
        }
    }, [])



    return (
        <main >
            <NavBar />
            <div className="flex ">
                <div className="w-20 ">
                    <SideNav />
                </div>
                <div className=" mx-28 mt-10 w-full" >

                    <CardAmphie {...amphi_data} />

                    <div className="mt-10 ">
                        <OptionMenuHistoryAmphie socket={socket} setChartLabel={setChartLabel} />
                    </div>
                    <ChartAmphie socket={socket} chartLabel={chartLabel} />
                </div>
            </div>
        </main>
    )
}