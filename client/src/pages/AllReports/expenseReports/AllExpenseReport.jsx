import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ReportsHomeSidebar from '../SideBar';


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllExpenseReport = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroupedRecords = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/financial-records/grouped-by-vehicle');
        if (!response.ok) {
          console.error('Error fetching grouped records:', response.status);
          setLoading(false);
          return;
        }

        const { data } = await response.json();
        const vehicleEntries = Object.entries(data);

        if (vehicleEntries.length > 0) {
          setVehicles(vehicleEntries);
          setSelectedVehicle(vehicleEntries[0]); // Set the first vehicle as default
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching grouped records:', error);
        setLoading(false);
      }
    };

    fetchGroupedRecords();
  }, []);

  // Prepare data for the bar chart based on selected vehicle's expenses
  const getChartData = () => {
    if (!selectedVehicle) return { labels: [], datasets: [] };

    const [registrationNumber, vehicleData] = selectedVehicle;
    const { primaryEvacuationExpenses, generalExpenses, otherTripExpenses } = vehicleData;

    // Combine all expenses
    const allExpenses = [
      ...primaryEvacuationExpenses,
      ...generalExpenses,
      ...otherTripExpenses,
    ];

    // Group expenses by category
    const expenseCategories = allExpenses.reduce((acc, expense) => {
      const category = expense.category;
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {});

    // Generate distinct colors for each bar
    const barColors = Object.keys(expenseCategories).map(
      () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
    );

    return {
      labels: Object.keys(expenseCategories),
      datasets: [
        {
          label: 'Total Expenses by Category',
          data: Object.values(expenseCategories),
          backgroundColor: barColors,
          borderColor: barColors.map(color => color.replace('0.6', '1')), // Darken the borders
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 3,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Total Expenses by Category',
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  // Define unique colors for each category's heading
  const categoryHeadingColors = {
    primaryEvacuationExpenses: 'lightblue',
    generalExpenses: 'lightgreen',
    otherTripExpenses: 'lightcoral',
  };

  return (
    <Container fluid style={{ padding: 0, width: '100vw', margin: 0, overflowX: 'hidden' }}>
      {/* Include the Sidebar as an off-canvas component */}
      <ReportsHomeSidebar />

      <Container fluid style={{ padding: '20px', margin: '0 auto' }}>
        {selectedVehicle && (
          <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
            All Expense Report for Vehicle: {selectedVehicle[1].vehicleInfo.registrationNumber}
          </h2>
        )}

        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>
        ) : (
          selectedVehicle && (
            <>
              {/* Bar Chart */}
              <div style={{ marginBottom: '40px', width: '100vw', height: '300px', margin: '0 auto' }}>
                <Bar data={getChartData()} options={chartOptions} />
              </div>

              {/* Render each category's expenses in its own table if there are records */}
              {['primaryEvacuationExpenses', 'generalExpenses', 'otherTripExpenses'].map((expenseType) =>
                selectedVehicle[1][expenseType]?.length > 0 ? (
                  <div key={expenseType} style={{ marginBottom: '40px' }}>
                    <h3 style={{ color: categoryHeadingColors[expenseType], marginBottom: '15px' }}>
                      Category: {expenseType.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <Table striped bordered hover variant="dark" responsive>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Amount (Ghc)</th>
                          <th>Payment Method</th>
                          <th>Notes</th>
                          <th>Recorded By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedVehicle[1][expenseType].map((expense) => (
                          <tr key={expense._id}>
                            <td>
                              {new Date(expense.dateOfExpense || expense.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: '2-digit',
                              })}
                            </td>
                            <td>{expense.amount.toLocaleString()}</td>
                            <td>{expense.paymentMethod || 'N/A'}</td>
                            <td>{expense.notes || 'N/A'}</td>
                            <td>{expense.recordedBy || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : null
              )}
            </>
          )
        )}
      </Container>
    </Container>
  );
};

export default AllExpenseReport;
