import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const MyChart = () => {

    const chart1Ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Maintenance and Repairs Chart
    const ctx1 = chart1Ref.current.getContext('2d');
    new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: ['Maintenance', 'Repairs'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19],
          borderWidth: 3,
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        }],
      },
      options: {},
    });

    // Expense/Income Chart
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: '# of Votes',
          data: [12, 9, 30, 0, 10, 200, 3, 4, 1, 8, 8, 100],
          borderWidth: 3,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        }],
      },
      options: {},
    });

    return () => {
      // Cleanup charts on component unmount
      Chart.getChart(ctx1).destroy();
      Chart.getChart(ctx).destroy();
    };
  }, []);

  return (

    <div>

            <h1 id='chartH1'>Monitor</h1>

      <div className="test">
        <h3>Vehicle Maintenance/Repair</h3>
        <canvas ref={chart1Ref}></canvas>
      </div>

      <div className="Expenses">
        <h3>Expenses</h3>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>);
};


export default MyChart;
