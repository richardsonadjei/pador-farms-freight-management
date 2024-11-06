import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PrimaryEvacuationContent = () => {
  const [evacuationData, setEvacuationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvacuationData = async () => {
    try {
      const response = await fetch('/api/primary-evacuations');
      const data = await response.json();
      if (data.success) {
        setEvacuationData(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching evacuation data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvacuationData();
  }, []);

  const aggregateDataByMonthAndYear = () => {
    const monthlyData = new Array(12).fill(0);
    const yearlyData = {};

    evacuationData.forEach((item) => {
      const evacuationDate = new Date(item.dateOfEvacuation);
      const month = evacuationDate.getMonth();
      const year = evacuationDate.getFullYear();

      monthlyData[month] += item.numberOfBags;

      if (!yearlyData[year]) {
        yearlyData[year] = 0;
      }
      yearlyData[year] += item.numberOfBags;
    });

    return { monthlyData, yearlyData };
  };

  const { monthlyData, yearlyData } = aggregateDataByMonthAndYear();

  const monthlyChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Number of Bags Hauled (Monthly)',
        data: monthlyData,
        backgroundColor: '#36a2eb',
      },
    ],
  };

  const yearlyChartData = {
    labels: Object.keys(yearlyData),
    datasets: [
      {
        label: 'Number of Bags Hauled (Yearly)',
        data: Object.values(yearlyData),
        backgroundColor: '#ff6384',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    barPercentage: 0.4,
    categoryPercentage: 0.4,
  };

  return (
    <div style={{ padding: '10px' }}>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ height: '300px', width: '100%' }}>
              <h3 style={{ textAlign: 'center' }}>Monthly Bags Hauled</h3>
              <Bar data={monthlyChartData} options={chartOptions} />
            </div>
            <div style={{ height: '300px', width: '100%' }}>
            <h3 style={{ textAlign: 'center' }}>Year-Year Bags Hauled</h3>

              <Bar data={yearlyChartData} options={chartOptions} />
            </div>
          </div>

          <div style={{ marginTop: '70px', maxHeight: '250px', overflowY: 'auto' }}>
            <table
              border="1"
              cellPadding="10"
              style={{
                width: '100%',
                marginTop: '20px',
                tableLayout: 'fixed',
              }}
            >
              <thead>
                <tr style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
                  <th>#</th>
                  <th>Date</th>
                  <th>Vehicle</th>
                  <th>Driver</th>
                  <th>Location</th>
                 
                  <th>Number of Bags</th>
                  <th>Price Per Bag (Ghc)</th>
                  <th>Total Value (Ghc)</th>
                </tr>
              </thead>
              <tbody>
                {evacuationData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{new Date(item.dateOfEvacuation).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                    <td>{item.vehicle.registrationNumber}</td>
                    <td>{`${item.driver.firstName} ${item.driver.lastName}`}</td>
                    <td>{item.evacuationLocation}</td>
                    
                    <td>{item.numberOfBags}</td>
                    <td>{item.cocoaPricePerBag.pricePerBagAfterTax}</td>
                    <td>{(item.numberOfBags * item.cocoaPricePerBag.pricePerBagAfterTax).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrimaryEvacuationContent;
