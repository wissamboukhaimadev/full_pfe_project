"use client"

import { CardsThirdFloor } from "@/components/custom/CardsThirdFloor";
import { ChartsData } from "@/components/custom/ChartsData";
import { NavBar } from "@/components/custom/NavBar";
import { SideNav } from "@/components/custom/SideNav";
import { IStageData } from "@/utils/db_types";
import { useEffect, useState } from "react";

import io, { Socket } from "socket.io-client"

const socket = io("ws://localhost:4000")

export default function ThirdFloor() {

    const [stage3_data, setStage3_data] = useState<IStageData>({})

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

                    <ChartsData />
                </div>
            </div>
        </main>
    )
}