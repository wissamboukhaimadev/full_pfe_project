import { IAmphieData } from '@/utils/db_types';
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

import { Flip, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { checkToastShow } from '@/utils/functions/showToats';


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
            text: 'Temperature/Humidity/CO2',
        },
    },
};

type TChartLabels = "daily" | "monthly" | "yearly"
type TsocketType = {
    socket: Socket,
    chartLabel: TChartLabels
}


export function ChartAmphie({ socket, chartLabel }: TsocketType) {

    const [chartValues, setChartValues] = useState<IAmphieData[]>([])

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
                fill: false,
                label: 'Temperature',
                data: labels.map((_, index) => {

                    if (chartValues[index]) return chartValues[index].temperature
                    return 0;

                }),
                borderColor: 'rgba(189, 255, 0, 0.8)',
                backgroundColor: 'rgba(189, 255, 0, 0.8)',
                yAxisID: 'y',
            },
            {
                fill: false,
                label: 'Humidity',
                data: labels.map((_, index) => {

                    if (chartValues[index]) return chartValues[index].humidity
                    return 0;

                }),
                borderColor: 'rgba(45, 205, 237, 0.8)',
                backgroundColor: 'rgba(45, 205, 237, 0.8)',
                yAxisID: 'y',
            },
            {
                fill: false,
                label: 'co2_gaz',
                data: labels.map((_, index) => {

                    if (chartValues[index]) return chartValues[index].co2_gaz
                    return 0;

                }),
                borderColor: 'rgba(104, 115, 112, 0.8)',
                backgroundColor: 'rgba(104, 115, 112, 0.8)',
                yAxisID: 'y',
            },

        ],
    };

    useEffect(() => {
        socket.on("amphie_chart_data_update", (data: IAmphieData[]) => {
            setChartValues(_ => [...data])

            const state = data.map(item => item.temperature === "0" && item.co2_gaz === "0" && item.humidity === "0")
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
            socket.off("amphie_chart_data_update")
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