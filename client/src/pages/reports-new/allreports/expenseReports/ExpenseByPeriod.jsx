import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ReportsHomeSidebar from '../../SideBar';
import { useMotorbike } from '../MotorBikeContext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseByPeriod = () => {
  const { selectedBikeId } = useMotorbike(); // Use the motorbike context to get the selected bike ID
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState(''); // State to hold the registration number

  useEffect(() => {
    if (!selectedBikeId) {
      setExpenses([]);
      setRegistrationNumber('');
    } else {
      // Fetch the registration number of the selected bike
      const fetchRegistrationNumber = async () => {
        try {
          const response = await fetch(`/api/motorbikes/${selectedBikeId}`);
          if (!response.ok) {
            console.error('Error fetching motorbike details:', response.status);
            return;
          }

          const data = await response.json();
          setRegistrationNumber(data.registrationNumber);
        } catch (error) {
          console.error('Error fetching motorbike details:', error);
        }
      };

      fetchRegistrationNumber();
    }
  }, [selectedBikeId]);

  useEffect(() => {
    if (startDate && endDate && selectedBikeId) {
      fetchExpenses();
    }
  }, [startDate, endDate, selectedBikeId]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/expenses/motorbike/${selectedBikeId}/period?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        console.error('Error fetching expenses:', response.status);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setExpenses(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  // Prepare data for the bar chart
  const categories = expenses.map((expense) => expense.category.name);
  const totals = expenses.map((expense) => expense.amount);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Total Expenses by Category',
        data: totals,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 3, // Reduce the height of the chart
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Set legend text color to white
        },
      },
      title: {
        display: true,
        text: 'Total Expenses by Category',
        color: 'white', // Set title text color to white
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Set x-axis labels color to white
        },
      },
      y: {
        ticks: {
          color: 'white', // Set y-axis labels color to white
        },
      },
    },
  };

  // Group expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const { category } = expense;
    if (!acc[category.name]) {
      acc[category.name] = [];
    }
    acc[category.name].push(expense);
    return acc;
  }, {});

  return (
    <Container fluid style={{ padding: 0, width: '100vw', margin: 0, overflowX: 'hidden' }}>
      {/* Include the Sidebar as an off-canvas component */}
      <ReportsHomeSidebar />

      <Container fluid style={{ padding: '20px', margin: '0 auto' }}>
        <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          Expense Report by Period for Motorbike: {registrationNumber || 'N/A'}
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
          <Button
            variant="primary"
            onClick={fetchExpenses}
            style={{ marginTop: '10px' }}
          >
            Get Expenses
          </Button>
        </Form>

        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>
        ) : (
          <>
            {/* Bar Chart */}
            <div style={{ marginBottom: '40px', width: '100vw', height: '300px', margin: '0 auto' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Render each category's expenses in its own table */}
            {Object.keys(groupedExpenses).map((categoryName) => (
              <div key={categoryName} style={{ marginBottom: '40px' }}>
                <h3 style={{ color: 'white', marginBottom: '15px' }}>
                  Category: {categoryName}
                </h3>
                <Table striped bordered hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Amount (Ghc)</th>
                      <th>Payment Method</th>
                      <th>Notes</th>
                      <th>Recorded By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedExpenses[categoryName].map((expense, index) => (
                      <tr key={expense._id}>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(expense.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: '2-digit',
                          })}
                        </td>
                        <td>{expense.amount.toLocaleString()}</td>
                        <td>{expense.paymentMethod}</td>
                        <td>{expense.notes || 'N/A'}</td>
                        <td>{expense.recordedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ))}
          </>
        )}
      </Container>
    </Container>
  );
};

export default ExpenseByPeriod;