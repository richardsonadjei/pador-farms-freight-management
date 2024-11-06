import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ReportsHomeSidebar from '../../SideBar';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseByPeriod = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [expenses, setExpenses] = useState(null); // Set initial value to null to track if data is loaded
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if the data has been fetched

  // Fetch vehicles and set the first one as the default
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/financial-records/grouped-by-vehicle');
        if (!response.ok) {
          console.error('Error fetching vehicles:', response.status);
          return;
        }

        const { data } = await response.json();
        const vehicleEntries = Object.entries(data);

        if (vehicleEntries.length > 0) {
          setVehicles(vehicleEntries);
          setSelectedVehicle(vehicleEntries[0]);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  // Fetch expenses only when the generate button is clicked
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setIsDataFetched(false); // Reset before fetching

      const [registrationNumber] = selectedVehicle;
      const response = await fetch(
        `/api/financial-records/vehicle-within-period?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        console.error('Error fetching expenses:', response.status);
        setLoading(false);
        return;
      }

      const { data } = await response.json();
      if (data && data[registrationNumber]) {
        setExpenses({
          primaryEvacuationExpenses: data[registrationNumber].primaryEvacuationExpenses,
          generalExpenses: data[registrationNumber].generalExpenses,
          otherTripExpenses: data[registrationNumber].otherTripExpenses,
          incomes: data[registrationNumber].incomes,
        });
      } else {
        setExpenses([]);
      }

      setIsDataFetched(true); // Set as fetched after successful fetch
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  // Generate random colors for each bar
  const generateBarColors = (count) => {
    return Array.from({ length: count }, () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
    );
  };

  // Prepare data for the bar chart
  const getChartData = () => {
    if (!expenses) return { labels: [], datasets: [] };

    const expenseCategories = {};
    ['primaryEvacuationExpenses', 'generalExpenses', 'otherTripExpenses'].forEach((type) => {
      (expenses[type] || []).forEach((expense) => {
        const category = expense.category || 'Unknown';
        expenseCategories[category] = (expenseCategories[category] || 0) + expense.amount;
      });
    });

    const barColors = generateBarColors(Object.keys(expenseCategories).length);

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
      legend: { position: 'top', labels: { color: 'white' } },
      title: { display: true, text: 'Total Expenses by Category', color: 'white' },
    },
    scales: {
      x: { ticks: { color: 'white' } },
      y: { ticks: { color: 'white' } },
    },
  };

  // Colors for different categories in table headers
  const categoryColors = {
    primaryEvacuationExpenses: 'lightblue',
    generalExpenses: 'lightgreen',
    otherTripExpenses: 'lightcoral',
  };

  return (
    <Container fluid style={{ padding: 0, width: '100vw', margin: 0, overflowX: 'hidden' }}>
      {/* Include the Sidebar as an off-canvas component */}
      <ReportsHomeSidebar />

      <Container fluid style={{ padding: '20px', margin: '0 auto' }}>
        <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          Expense Report by Period for Vehicle: {selectedVehicle ? selectedVehicle[1].vehicleInfo.registrationNumber : 'N/A'}
        </h2>

        {/* Form to select the start and end date */}
        <Form style={{ marginBottom: '20px' }}>
          <Form.Group controlId="startDate">
            <Form.Label style={{ color: 'white' }}>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="endDate" style={{ marginTop: '10px' }}>
            <Form.Label style={{ color: 'white' }}>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={fetchExpenses} style={{ marginTop: '10px' }}>
            Get Expenses
          </Button>
        </Form>

        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>
        ) : isDataFetched && (expenses === null || Object.values(expenses).every((arr) => arr.length === 0)) ? (
          <p style={{ color: 'white', textAlign: 'center' }}>No records found for the selected period.</p>
        ) : (
          isDataFetched && (
            <>
              {/* Bar Chart */}
              <div style={{ marginBottom: '40px', width: '100vw', height: '300px', margin: '0 auto' }}>
                <Bar data={getChartData()} options={chartOptions} />
              </div>

              {/* Render each category's expenses in its own table if data exists */}
              {['primaryEvacuationExpenses', 'generalExpenses', 'otherTripExpenses'].map((expenseType) => (
                expenses[expenseType]?.length > 0 && (
                  <div key={expenseType} style={{ marginBottom: '40px' }}>
                    <h3 style={{ color: categoryColors[expenseType], marginBottom: '15px' }}>
                      {expenseType.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <Table striped bordered hover variant="dark" responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Amount (Ghc)</th>
                          <th>Notes</th>
                          <th>Recorded By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses[expenseType].map((expense, index) => (
                          <tr key={expense._id}>
                            <td>{index + 1}</td>
                            <td>
                              {new Date(expense.dateOfExpense || expense.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: '2-digit',
                              })}
                            </td>
                            <td>{expense.amount.toLocaleString()}</td>
                            <td>{expense.notes || 'N/A'}</td>
                            <td>{expense.recordedBy || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )
              ))}
            </>
          )
        )}
      </Container>
    </Container>
  );
};

export default ExpenseByPeriod;
