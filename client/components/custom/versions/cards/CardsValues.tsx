import { AlertCircle, PercentCircle, Thermometer } from "lucide-react";
import { Card, CardDescription, CardTitle } from "../../../ui/card";
import { Progress } from "../../../ui/progress";

export function CardsValues() {
    return (
        <div className="mx-20 grid grid-cols-3 gap-10">
            <Card className="py-5 px-7 shadow-lg rounded-lg cursor-pointer hover:scale-110 transition-all">
                <div className="flex justify-between">
                    <CardTitle>
                        <p>Tempurature</p>
                    </CardTitle>
                    <Thermometer className="ml-10" size={30} />
                </div>
                <CardDescription className="pt-2">
                    <p>31°</p>
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
                    <PercentCircle className="ml-10" size={30} />
                </div>
                <CardDescription className="pt-2">
                    <p>27%</p>
                </CardDescription>
                <CardDescription className="pt-5">
                    <Progress value={27} indicatorColor="bg-orange-400" forgroundColor="bg-white" className="shadow-xl " />
                </CardDescription>
            </Card>
            <Card className="py-5 px-7 shadow-lg rounded-lg cursor-pointer hover:scale-110 transition-all">
                <div className="flex justify-between">
                    <CardTitle>
                        <p>CO<sub>2</sub></p>
                    </CardTitle>
                    <AlertCircle className="ml-10" size={30} />
                </div>
                <CardDescription className="pt-2">
                    <p>17%</p>
                </CardDescription>
                <CardDescription className="pt-5">
                    <Progress value={17} indicatorColor="bg-gray-400" forgroundColor="bg-white" className="shadow-xl " />
                </CardDescription>
            </Card>



        </div>
    )
}
