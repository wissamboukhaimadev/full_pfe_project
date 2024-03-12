import { naviagtion_items } from "@/utils/navigation_items"
import { AlignRight } from "lucide-react"
import Link from "next/link"

export function NavBar() {
    return (
        <div className="flex justify-between px-10 pt-10 ">
            <div></div>
            <div className="flex ">
                {naviagtion_items.map(item => (
                    <Link href={item.link} key={item.id} >
                        <p className="font-bold pr-5">{item.text}</p>
                    </Link>
                ))}

                <AlignRight className="hover:cursor-pointer " />
            </div>
        </div>
    )
}