import { Droplet, Zap } from "lucide-react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { IStageData } from "@/utils/db_types";


export function CardsFirstFloor({ tension, current, power, energy }: IStageData) {
    return (
        <div className="mx-20 grid grid-cols-2 gap-10">
            <Dialog>
                <DialogTrigger>
                    <Card className="py-5 px-7 shadow-lg rounded-lg cursor-pointer hover:scale-110 transition-all">
                        <div className="flex justify-between">
                            <CardTitle>
                                <p>Elecricity</p>
                            </CardTitle>
                            <Zap className="ml-10 fill-yellow-300 " size={30} />
                        </div>
                        <CardDescription className="pt-2">
                            <p className="text-left">{energy}</p>
                        </CardDescription>
                        <CardDescription className="pt-5">
                            <Progress value={33} indicatorColor="bg-yellow-300" forgroundColor="bg-white" className="shadow-xl " />
                        </CardDescription>
                    </Card>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Electricity distribution</DialogTitle>

                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <p>tension</p>
                            <p>{tension}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <p>courent</p>
                            <p>{current}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <p>puissance </p>
                            <p>{power}</p>
                        </div>

                    </div>

                </DialogContent>
            </Dialog>
            <Card className="py-5 px-7 shadow-lg rounded-lg cursor-pointer hover:scale-110 transition-all">
                <div className="flex justify-between">
                    <CardTitle>
                        <p>Water</p>
                    </CardTitle>
                    <Droplet className="ml-10 fill-blue-400" size={30} />
                </div>
                <CardDescription className="pt-2">
                    <p>27</p>
                </CardDescription>
                <CardDescription className="pt-5">
                    <Progress value={27} indicatorColor="bg-blue-400" forgroundColor="bg-white" className="shadow-xl " />
                </CardDescription>
            </Card>




        </div>
    )
}
