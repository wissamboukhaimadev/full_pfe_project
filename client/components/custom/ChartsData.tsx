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

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Electricity/water',
        },
    },
};
const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Electricity',
            data: labels.map((item, index) => array_numbers1[index]),
            borderColor: 'rgb(255, 99, 200)',
            backgroundColor: 'rgba(255, 255, 132, 0.9)',
            yAxisID: 'y',
        },
        {
            fill: true,
            label: 'Water',
            data: labels.map((item, index) => array_numbers2[index]),
            borderColor: 'rgb(255, 166, 20)',
            backgroundColor: 'rgba(0.5, 160, 255, 255)',
            yAxisID: 'y',
        },

    ],
};

export function ChartsData() {
    return (
        <div className="my-10 w-full ">
            <Line options={options} data={data} />
        </div>
    )
}