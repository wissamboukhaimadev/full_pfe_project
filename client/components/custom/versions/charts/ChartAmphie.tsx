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
            return ["00:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
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
                label: 'Humidity',
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
            console.log("received")
            setChartValues(prevState => [...data])

        })
    }, [])

    console.log(chartValues)

    return (
        <div className="my-10 w-full ">
            <Line options={options} data={data} />
        </div>
    )
}