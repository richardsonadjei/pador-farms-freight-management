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

// Register necessary chart elements
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

  // Function to fetch primary evacuation data
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

  // Fetch data on component mount
  useEffect(() => {
    fetchEvacuationData();
  }, []);

  // Aggregate data by month and year
  const aggregateDataByMonthAndYear = () => {
    const monthlyData = new Array(12).fill(0); // Array to store the total number of bags per month
    const yearlyData = {}; // Object to store the total number of bags per year

    evacuationData.forEach((item) => {
      const evacuationDate = new Date(item.dateOfEvacuation);
      const month = evacuationDate.getMonth(); // Get month (0 - 11)
      const year = evacuationDate.getFullYear(); // Get year

      // Add number of bags to the corresponding month
      monthlyData[month] += item.numberOfBags;

      // Add number of bags to the corresponding year
      if (!yearlyData[year]) {
        yearlyData[year] = 0;
      }
      yearlyData[year] += item.numberOfBags;
    });

    return { monthlyData, yearlyData };
  };

  const { monthlyData, yearlyData } = aggregateDataByMonthAndYear();

  // Prepare data for the monthly chart
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

  // Prepare data for the yearly chart
  const yearlyChartData = {
    labels: Object.keys(yearlyData), // Array of years
    datasets: [
      {
        label: 'Number of Bags Hauled (Yearly)',
        data: Object.values(yearlyData), // Array of total number of bags per year
        backgroundColor: '#ff6384',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensure charts resize properly
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
    barPercentage: 0.4, // Reduce the thickness of the bars
    categoryPercentage: 0.4, // Reduce the thickness of the bars
  };

  return (
    <div style={{ padding: '10px' }}>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          {/* Responsive container for charts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ height: '300px', width: '100%' }}>
              <h3>Total Bags Hauled per Month</h3>
              <Bar data={monthlyChartData} options={chartOptions} />
            </div>
            <div style={{ height: '300px', width: '100%' }}>
              <h3>Total Bags Hauled per Year</h3>
              <Bar data={yearlyChartData} options={chartOptions} />
            </div>
          </div>

          {/* Adding margin and scrollable table */}
          <div style={{ marginTop: '70px', maxHeight: '250px', overflowY: 'auto' }}>
            <table
              border="1"
              cellPadding="10"
              style={{
                width: '100%',
                marginTop: '20px',
                tableLayout: 'fixed', // Ensures the table adjusts to small screens
              }}
            >
              <thead>
                <tr style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
                  <th>#</th>
                  <th>Vehicle</th>
                  <th>Driver</th>
                  <th>Location</th>
                  <th>Date of Evacuation</th>
                  <th>Number of Bags</th>
                  <th>Price Per Bag (Ghc)</th>
                  <th>Total Value (Ghc)</th> {/* New column for total value */}
                </tr>
              </thead>
              <tbody>
                {evacuationData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.vehicle.registrationNumber}</td>
                    <td>{`${item.driver.firstName} ${item.driver.lastName}`}</td>
                    <td>{item.evacuationLocation}</td>
                    <td>{new Date(item.dateOfEvacuation).toLocaleDateString()}</td>
                    <td>{item.numberOfBags}</td>
                    <td>{item.cocoaPricePerBag.pricePerBagAfterTax}</td>
                    <td>{(item.numberOfBags * item.cocoaPricePerBag.pricePerBagAfterTax).toFixed(2)}</td> {/* Calculated total value */}
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
