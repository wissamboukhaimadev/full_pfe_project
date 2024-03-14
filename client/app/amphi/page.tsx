"use client"

import { CardAmphie } from "@/components/custom/CardAmphi"
import { ChartTemperatureHumidity } from "@/components/custom/ChartTemperatureH"
import { NavBar } from "@/components/custom/NavBar"
import { OptionMenuHistory } from "@/components/custom/OptionMenuHistory"
import { SideNav } from "@/components/custom/SideNav"
import { IAmphieData } from "@/utils/db_types"
import { useEffect, useState } from "react"

import io, { Socket } from "socket.io-client"


const socket: Socket = io("ws://localhost:4000")

export default function AmphiClass() {

    const [amphi_data, setAmphie_data] = useState<IAmphieData>({})


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
                        <OptionMenuHistory socket={socket} />
                    </div>
                    <ChartTemperatureHumidity socket={socket} />
                </div>
            </div>
        </main>
    )
}