import { IStageData } from '@/utils/db_types';
import { checkToastShow } from '@/utils/functions/showToats';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Socket } from 'socket.io-client';
import { ToastContainer, toast, Flip } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);



const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,

        },
        title: {
            display: true,
            text: 'Energy',
        },
    },
};

type TChartLabels = "daily" | "monthly" | "yearly"
type TsocketType = {
    socket: Socket,
    chartLabel: TChartLabels
}


export function ChartStage2({ socket, chartLabel }: TsocketType) {

    const [chartValues, setChartValues] = useState<IStageData[]>([])

    const labels_markeup = () => {
        if (chartLabel === "daily") {
            return Array.from({ length: 24 }, (_, index) => index.toString())
        } else if (chartLabel === "monthly") {
            return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        } else {
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"]
        }
    }
    const labels = labels_markeup()


    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Electricity',
                data: labels.map((_, index) => {

                    if (chartValues[index]) return chartValues[index].energy
                    return 0;

                }),
                borderColor: 'rgba(48, 86, 255, 0.8)',
                backgroundColor: 'rgba(48, 86, 255, 0.8)',
                yAxisID: 'y',
            },



        ],
    };


    useEffect(() => {
        socket.on("stage2_chart_data_update", (data: IStageData[]) => {
            setChartValues(_ => [...data])
            const state = data.map(item => item.current === "0" && item.tension === "0" && item.energy === "0" && item.puissance_active === "0" && item.puissance_reactive === "0" && item.puissance_apparente === "0")
            if (checkToastShow(state)) {
                toast.error(`data is not availaible for today`, {
                    position: "top-right",
                    transition: Flip
                });

            } else {
                toast.success(`data successfully fetched `, {
                    position: "top-right",
                    transition: Flip
                });
            }
        })

        return () => {
            socket.off("stage2_chart_data_update")
        }
    }, [])


    return (
        <div className="my-10 w-full ">
            <Line options={options} data={data} />
            <ToastContainer
                hideProgressBar
                pauseOnHover={false}
                theme='dark'
                autoClose={1000}
                draggable
            />
        </div>
    )
}