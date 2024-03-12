"use client"

import { CardsSecondFloor } from "@/components/custom/CardsSecondFloor";
import { ChartsData } from "@/components/custom/ChartsData";
import { NavBar } from "@/components/custom/NavBar";
import { SideNav } from "@/components/custom/SideNav";
import { IStageData } from "@/utils/db_types";
import { useEffect, useState } from "react";

import io from "socket.io-client"

const socket = io("ws://localhost:4000")


export default function SecondFloor() {

    const [stage2_data, setStage2_data] = useState<IStageData>({})

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

                    <ChartsData />
                </div>
            </div>
        </main>
    )
}