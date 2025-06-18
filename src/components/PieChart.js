// components/PieChart.js
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function PieChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Retail & Payments', 'Healthcare', 'Marketing', 'Education', 'Transportation', 'Other'],
          datasets: [{
            data: [42, 18, 15, 12, 8, 5],
            backgroundColor: [
              '#4F46E5',
              '#10B981',
              '#3B82F6',
              '#F59E0B',
              '#EF4444',
              '#6B7280'
            ],
            borderWidth: 0,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw}%`;
                }
              }
            }
          },
          cutout: '70%',
        }
      });
    }

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
}