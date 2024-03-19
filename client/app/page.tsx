"use client"
import { CardsHome } from "@/components/custom/CardsHome";
// import { ChartsData } from "@/components/custom/versions/charts/ChartStage1";
import { NavBar } from "@/components/custom/NavBar";
import { SideNav } from "@/components/custom/SideNav";


export default function Home() {
  return (
    <main >
      <NavBar />
      <div className="flex ">
        <div className="w-20 ">
          <SideNav />
        </div>
        <div className=" mx-28 mt-10 w-full" >


          <CardsHome />

          {/* <ChartsData /> */}
        </div>
      </div>
    </main>
  );
}
