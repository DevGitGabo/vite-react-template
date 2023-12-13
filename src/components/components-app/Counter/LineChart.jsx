import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import authToken from "../../../authToken";


const LineChart = () => {
  const userInformationString = localStorage.getItem('userInformation');
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;

  const [productsData, setProductsData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    authToken(token);

    axios.get('https://backendcasona-production.up.railway.app/counter/getAllHistoriales').then((res) => {
      const data = res.data;
      const lastRecord = data.slice(-1)[0]; // Obtiene el último elemento del array
      if (lastRecord && lastRecord.productos) {
        setProductsData(lastRecord.productos);
      }
    });
  }, []);

  useEffect(() => {
    const updateChartData = () => {
      if (!productsData || productsData.length === 0) return;

      const newLabels = [];
      const datasets = {};

      productsData.forEach((product) => {
        const productName = product.nombreProducto;
        const ventasPorMesProducto = product.ventasPorMesProducto;

        Object.keys(ventasPorMesProducto).forEach((key) => {
          if (!newLabels.includes(key)) {
            newLabels.push(key);
          }

          if (!datasets[productName]) {
            datasets[productName] = Array(newLabels.length - 1).fill(null);
          }

          const index = newLabels.indexOf(key);
          datasets[productName][index] = ventasPorMesProducto[key];
        });
      });

      const newDatasets = Object.keys(datasets).map((productName) => ({
        label: productName,
        data: datasets[productName],
        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        borderWidth: 2,
        fill: false,
      }));

      setChartData({
        labels: newLabels,
        datasets: newDatasets,
      });
    };

    updateChartData();
  }, [productsData]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-1">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
