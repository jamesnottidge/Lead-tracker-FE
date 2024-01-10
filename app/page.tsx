"use client";
import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import CsvUpload from "./components/CsvUpload";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface Item {
  Category: string;
  Count: number;
}

interface Data {
  key: number;
  title: string;
  data: Item[];
}

const backgroundColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

const borderColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

function DataSet({ key, title, data }: Data) {
  const [jsonData, setJsonData] = useState(data);
  console.log(jsonData);
  const labels = jsonData?.map((item: Item) => item.Category);
  const counts = jsonData?.map((item: Item) => item.Count);
  const dataset = {
    labels: labels,
    datasets: [
      {
        label: "# of Candidates",
        data: counts,
        backgroundColor: backgroundColors.slice(0, labels?.length),
        borderColor: borderColors.slice(0, labels?.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="flex flex-col items-center justify-between p-24">
      <h1>{title}</h1>
      <Pie data={dataset} />
    </section>
  );
}

function AddNewDataSet({ add }: { add: (data: Data) => void }) {
  const [jsonData, setJsonData] = useState([{} as Item]);
  const [title, setTitle] = useState("");
  console.log(jsonData);

  return (
    <div className="w-full bg-red-400">
      <div className="flex  w-full">
        <form className="text-black w-full ">
          <input
            className="border-2 p-2 border-blue-500 w-11/12 h-12 rounded-md"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </form>
        <button
            className="border-2 border-blue-500 w-1/12 rounded-lg bg-blue-500 text-white font-bold h-12 hover:"
          onClick={() =>
            add({
              key: Date.now(),
              data: jsonData,
              title: title,
            })
          }
        >
          ADD
        </button>
      </div>
      <div
      className="flex bg-blue-200 justify-center py-4 rounded-xl hover:bg-blue-300 mt-8"
      >
      <CsvUpload jsonData={jsonData} setJsonData={setJsonData} />
      </div>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<Data[]>();
  console.log(data);
  const add = (newDataItem: Data) => {
    const newData = data ? [...data, newDataItem] : [newDataItem];
    setData(newData);
  };

  return (
    <main className="min-h-screen justify-between p-24">
      <div className="flex flex-col items-center">
        {data?.map((item: Data) => (
          <DataSet key={item.key} title={item.title} data={item.data} />
        ))}
      </div>
      <div>
        <AddNewDataSet add={add} />
      </div>
    </main>
  );
}
