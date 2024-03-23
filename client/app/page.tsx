"use client"
import { NavBar } from "@/components/custom/NavBar";
import { SideNav } from "@/components/custom/SideNav";
import { CardsGlobal } from "@/components/custom/versions/cards/CardsGlobal";
import { ChartGlobal } from "@/components/custom/versions/charts/ChartGlobal";
import { OptionMenuHistoryGlobal } from "@/components/custom/versions/select_date/OptionMenuGlobal";
import { IStageData } from "@/utils/db_types";
import { TChartLabels } from "@/utils/types_app";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"


const socket: Socket = io("ws://localhost:4000")
export default function Home() {

  const [global_data, setGlobal_data] = useState<IStageData>({})
  const [chartLabel, setChartLabel] = useState<TChartLabels>("daily")


  useEffect(() => {

    socket.on("inserted_global_data", (data: IStageData) => {
      localStorage.setItem("latest_stage1", JSON.stringify(data))
      // @ts-ignore
      setGlobal_data(JSON.parse(localStorage.getItem("latest_stage1")))
    })
    if (localStorage.getItem("latest_stage1")) {
      //@ts-ignore
      setGlobal_data(JSON.parse(localStorage.getItem("latest_stage1")))
    }
    return () => {
      socket.off("inserted_global_data")
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


          <CardsGlobal {...global_data} />

          <div className="mt-10 ">
            <OptionMenuHistoryGlobal socket={socket} setChartLabel={setChartLabel} />
          </div>
          <ChartGlobal socket={socket} chartLabel={chartLabel} />
        </div>
      </div>
    </main>
  );
}
