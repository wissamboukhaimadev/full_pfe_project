import { Dispatch, SetStateAction, useState } from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "../../../ui/calendar"
import { Popover } from "../../../ui/popover"
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "../../../ui/button"
import { CalendarIcon } from "lucide-react"
import { Socket } from "socket.io-client"

type TChartLabels = "daily" | "monthly" | "yearly"


type TsocketType = {
    socket: Socket
    setChartLabel: Dispatch<SetStateAction<TChartLabels>>
}

export function OptionMenuHistoryGlobal({ socket, setChartLabel }: TsocketType) {

    const [date, setDate] = useState<Date | undefined>(new Date())
    const [dataFilterType, setDataFilterType] = useState<TChartLabels>("daily")

    const submitDate = () => {
        if (dataFilterType && date) {
            socket.emit("global_chart_data", {
                currentDate: date,
                settings: dataFilterType
            })
        }
    }


    return (
        <>
            <div className="flex justify-evenly">
                <Select defaultValue="daily" onValueChange={(value: TChartLabels) => {
                    setDataFilterType(value)
                    setChartLabel(value)

                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter data by time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>History</SelectLabel>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Popover >
                    <PopoverTrigger>
                        <Button variant="ghost" className="w-40 pl-3 text-left font-normal" >
                            <span>pick a date</span>
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="bg-white">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                className="rounded-md border"
                                captionLayout="dropdown-buttons"
                                fromYear={1990}
                                toYear={2090}
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="text-center mt-5">
                <Button onClick={submitDate} >Submit</Button>
            </div>
        </>
    )
}
