// src/RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ data }) => {
  // Provide default values if data is null or undefined
  const hp = data?.hp || 0;
  const attack = data?.attack || 0;
  const defense = data?.defense || 0;
  const spAttack = data?.spAttack || 0;
  const spDefense = data?.spDefense || 0;
  const speed = data?.speed || 0;

  const chartData = {
    labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
    datasets: [
      {
        label: 'Pokémon Stats',
        data: [hp, attack, defense, spAttack, spDefense, speed],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  return (
    <div>
      <Radar data={chartData} />
    </div>
  );
};

export default RadarChart;
