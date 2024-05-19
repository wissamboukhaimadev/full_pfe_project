import { AreaChart, LayoutDashboard, PieChart, School, ChevronFirst } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

export function SideNav() {
    const [currentIcon, setCurrentIcon] = useState<number>(0)

    useLayoutEffect(() => {
        if (localStorage.getItem('state')) {
            // @ts-ignore
            setCurrentIcon(parseInt(localStorage.getItem('state')))
        } else {
            localStorage.setItem('state', currentIcon.toString())
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('state', currentIcon.toString())
    }, [currentIcon])

    return (
        <div className=" fixed px-3  flex flex-col bg-purple-500 justify-center items-center  transition-all shadow-xl h-screen rounded-full ">

            <Link className="mb-5" href="/" onClick={() => setCurrentIcon(0)}>
                <div className={`rounded-full ${currentIcon == 0 && "bg-emerald-400  "} p-2 h-10 pb-10 `}>
                    <LayoutDashboard className="mb-5 text-white hover:text-black transition-all " size={30} />
                </div>
            </Link>

            <Link className="mb-5" href="/first_floor" onClick={() => setCurrentIcon(1)}>
                <div className={`rounded-full ${currentIcon == 1 && "bg-emerald-400 "} p-2 h-10 pb-10`}>
                    <AreaChart className={`mb-5 text-white hover:text-black transition-all`} size={30} />
                </div>
            </Link>

            <Link className="mb-5" href="/second_floor" onClick={() => setCurrentIcon(2)}>
                <div className={`rounded-full ${currentIcon == 2 && "bg-emerald-400 "} p-2 h-10 pb-10`}>
                    <PieChart className="mb-5 text-white hover:text-black transition-all cursor-pointer" size={30} />
                </div>
            </Link>

            <Link className="mb-5" href="/third_floor" onClick={() => setCurrentIcon(3)} >
                <div className={`rounded-full ${currentIcon == 3 && "bg-emerald-400 "} p-2 h-10 pb-10`} >
                    <ChevronFirst className="text-white hover:text-black transition-all cursor-pointer" size={30} />
                </div>
            </Link>

            <Link className="mb-5" href="/amphi" onClick={() => setCurrentIcon(4)} >
                <div className={`rounded-full ${currentIcon == 4 && "bg-emerald-400 "} p-2 h-10 pb-10`} >
                    <School className="text-white hover:text-black transition-all cursor-pointer" size={30} />
                </div>
            </Link>
        </div>
    )
}