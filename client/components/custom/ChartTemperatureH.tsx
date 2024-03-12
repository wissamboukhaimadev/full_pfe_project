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
import { Line } from 'react-chartjs-2';


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


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const array_numbers1 = [0, 10, 30, 20, 50, 30, 20]
const array_numbers2 = [10, 40, 30, 10, 30, 20, 40]
const array_numbers3 = [5, 15, 20, 30, 30, 25, 10]

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
const data = {
    labels,
    datasets: [
        {
            fill: false,
            label: 'Temperature',
            data: labels.map((item, index) => array_numbers1[index]),
            borderColor: 'rgba(189, 255, 0, 0.8)',
            backgroundColor: 'rgba(189, 255, 0, 0.8)',
            yAxisID: 'y',
        },
        {
            fill: false,
            label: 'Humidity',
            data: labels.map((item, index) => array_numbers2[index]),
            borderColor: 'rgba(16, 244, 137, 0.8)',
            backgroundColor: 'rgba(16, 244, 137, 0.8)',
            yAxisID: 'y',
        },
        {
            fill: false,
            label: 'CO2',
            data: labels.map((item, index) => array_numbers3[index]),
            borderColor: 'rgba(88, 103, 96, 0.8)',
            backgroundColor: 'rgba(88, 103, 96, 0.8)',
            yAxisID: 'y',
        },

    ],
};

export function ChartTemperatureHumidity() {
    return (
        <div className="my-10 w-full ">
            <Line options={options} data={data} />
        </div>
    )
}