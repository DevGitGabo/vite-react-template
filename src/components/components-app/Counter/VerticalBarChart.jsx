import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const VerticalBarChart = () => {
  const [selectedOption, setSelectedOption] = useState("Horas Trabajo");

  const data = {
    labels: ["8am", "9am", "10am", "11am", "12pm", "1pm"],
    datasets: [
      {
        label: "Horas Trabajo",
        data: [7, 8, 6, 7, 8, 7],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Pedidos mínimos por hora",
        data: [10, 10, 8, 10, 14, 12],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Pedidos máximos por hora",
        data: [5, 6, 4, 5, 7, 6],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const filteredData = {
    labels: data.labels,
    datasets:
      selectedOption === "" // Si no se ha seleccionado una opción, mostrar todos los datos
        ? data.datasets
        : data.datasets.filter((dataset) => dataset.label === selectedOption), // Filtrar según la opción seleccionada
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
    },
    indexAxis: "x",
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <div>
        <select
          className="bg-gray-200 border text-sm rounded-lg p-2 outline-none mt-5 w-full"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="">Escoja una opción</option>
          <option value="Horas Trabajo">Horas de Trabajo</option>
          <option value="Pedidos mínimos por hora">
            Pedidos Mínimos por Hora
          </option>
          <option value="Pedidos máximos por hora">
            Pedidos Máximos por Hora
          </option>
        </select>
        <select className="bg-gray-200 border text-sm rounded-lg p-2 outline-none mt-5 w-full">
          <option defaultValue>Ferreñafe</option>
          <option value="CIX">Chiclayo</option>
          <option value="LIM">Lima</option>
          <option value="FERREÑ">Cajamarca</option>
        </select>
      </div>
      <div className="mt-1 absolute bottom-4 w-full">
        <Bar data={filteredData} options={options} />
      </div>
    </div>
  );
};

export default VerticalBarChart;
