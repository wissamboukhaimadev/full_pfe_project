"use client"
import { NavBar } from "@/components/custom/NavBar";
import { SideNav } from "@/components/custom/SideNav";
import Link from "next/link";

export default function Help() {
    return (
        <main >
            <NavBar />
            <div className="flex ">
                <div className="w-20 ">
                    <SideNav />
                </div>
                <div className=" mx-10 mt-10 w-full" >
                    <p className="text-center">Backend server at <Link className="text-blue-500" href="http://localhost:4000" target="_blank">click here</Link></p>
                </div>
            </div>
        </main>
    )
}