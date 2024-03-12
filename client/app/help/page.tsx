"use client"
import { NavBar } from "@/components/custom/NavBar";
import { SideNav } from "@/components/custom/SideNav";

export default function Help() {
    return (
        <main >
            <NavBar />
            <div className="flex ">
                <div className="w-20 ">
                    <SideNav />
                </div>
                <div className=" mx-10 mt-10 w-full" >
                    <p className="text-center">not yet implemented</p>


                </div>
            </div>
        </main>
    )
}