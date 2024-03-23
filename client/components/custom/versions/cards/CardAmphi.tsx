import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ThermometerIcon } from "@/components/icons/Thermometer";
import { HumidityIcon } from "@/components/icons/HumidityIcon";
import { CO2Icon } from "@/components/icons/Co2Icon";
import { IAmphieData } from "@/utils/db_types";





export function CardAmphie(amphie_data: IAmphieData) {


    return (
        <div className="mx-20 grid grid-cols-2 gap-10">
            <Card className="py-5 px-7 shadow-lg rounded-lg cursor-pointer hover:scale-110 transition-all">
                <div className="flex justify-between">
                    <CardTitle>
                        <p>Tempurature</p>
                    </CardTitle>
                    <ThermometerIcon />
                </div>
                <CardDescription className="pt-2">
                    <p>{amphie_data.temperature}°</p>
                </CardDescription>
                <CardDescription className="pt-5">
                    <Progress value={33} indicatorColor="bg-blue-500" forgroundColor="bg-white" className="shadow-xl " />
                </CardDescription>
            </Card>
            <Card className="py-5 px-7 shadow-lg rounded-lg cursor-pointer hover:scale-110 transition-all">
                <div className="flex justify-between">
                    <CardTitle>
                        <p>Humidity</p>
                    </CardTitle>
                    <HumidityIcon />
                </div>
                <CardDescription className="pt-2">
                    <p>{amphie_data.humidity}%</p>
                </CardDescription>
                <CardDescription className="pt-5">
                    <Progress value={27} indicatorColor="bg-orange-400" forgroundColor="bg-white" className="shadow-xl " />
                </CardDescription>
            </Card>
            <Card className="py-5 px-7 shadow-lg rounded-lg cursor-pointer hover:scale-110 transition-all col-span-2 row-span-2">
                <div className="flex justify-between">
                    <CardTitle>
                        <p>CO<sub>2</sub></p>
                    </CardTitle>
                    <CO2Icon />
                </div>
                <CardDescription className="pt-2">
                    <p>{amphie_data.co2_gaz}%</p>
                </CardDescription>
                <CardDescription className="pt-5">
                    <Progress value={17} indicatorColor="bg-gray-400" forgroundColor="bg-white" className="shadow-xl " />
                </CardDescription>
            </Card>



        </div>
    )
}