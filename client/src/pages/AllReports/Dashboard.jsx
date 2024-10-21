import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Added PointElement here
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Registered PointElement here for the Line chart
  Title,
  Tooltip,
  Legend
);

const DashboardContent = () => {
  const [financialData, setFinancialData] = useState(null);

  // Function to fetch financial data
  const fetchFinancialData = async () => {
    try {
      const response = await fetch('/api/financial-records/grouped-by-vehicle');
      const data = await response.json();
      if (data.success) {
        setFinancialData(data.data);
      }
    } catch (error) {
      console.error('Error fetching financial data:', error);
    }
  };

  // Fetch the data from the API every 5 seconds
  useEffect(() => {
    fetchFinancialData(); // Fetch data immediately on mount

    const intervalId = setInterval(fetchFinancialData, 5000); // Fetch data every 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const generateChartsForVehicle = (vehicleData, vehicleName) => {
    const totalIncome = vehicleData.incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = vehicleData.generalExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    const netIncome = totalIncome - totalExpenses;

    // Monthly income and expense data
    const monthlyIncome = new Array(12).fill(0);
    const monthlyExpenses = new Array(12).fill(0);
    const monthlyNetIncome = new Array(12).fill(0); // Calculate net income per month

    vehicleData.incomes.forEach((income) => {
      const month = new Date(income.date).getMonth();
      monthlyIncome[month] += income.amount;
    });
    vehicleData.generalExpenses.forEach((expense) => {
      const month = new Date(expense.dateOfExpense).getMonth();
      monthlyExpenses[month] += expense.amount;
    });

    // Calculate net income for each month
    for (let i = 0; i < 12; i++) {
      monthlyNetIncome[i] = monthlyIncome[i] - monthlyExpenses[i];
    }

    // Get current month
    const currentMonthIndex = new Date().getMonth();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthName = monthNames[currentMonthIndex]; // Get current month name

    // Expenses by category data
    const categoriesMap = {};
    vehicleData.generalExpenses.forEach((expense) => {
      const category = expense.category || 'Uncategorized';
      if (!categoriesMap[category]) {
        categoriesMap[category] = 0;
      }
      categoriesMap[category] += expense.amount;
    });

    // Data for charts
    const totalIncomeExpenseData = {
      labels: [vehicleName],
      datasets: [
        {
          label: 'Total Income',
          backgroundColor: '#36a2eb',
          data: [totalIncome],
        },
        {
          label: 'Total Expenses',
          backgroundColor: '#ff6384',
          data: [totalExpenses],
        },
      ],
    };

    const monthlyIncomeExpenseData = {
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      datasets: [
        {
          label: 'Monthly Income',
          backgroundColor: '#36a2eb',
          borderColor: '#36a2eb',
          fill: false,
          data: monthlyIncome,
        },
        {
          label: 'Monthly Expenses',
          backgroundColor: '#ff6384',
          borderColor: '#ff6384',
          fill: false,
          data: monthlyExpenses,
        },
      ],
    };

    const categoryExpenseData = {
      labels: Object.keys(categoriesMap),
      datasets: [
        {
          label: 'Expenses by Category',
          backgroundColor: '#ffcd56',
          data: Object.values(categoriesMap),
        },
      ],
    };

    return (
      <div key={vehicleName} style={{ marginBottom: '40px', textAlign: 'center' }}>
        {/* Container for three charts in a row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {/* Total Income vs Expenses */}
          <div style={{ height: '300px', width: '100%' }}>
            <h4>Total Income vs Expenses ({vehicleName})</h4>
            <Bar data={totalIncomeExpenseData} options={chartOptions} />
            <p style={{ marginTop: '10px', color: '#4bc0c0' }}>
              Net Total Income: Ghc {netIncome.toFixed(2)} 
            </p>
          </div>

          {/* Monthly Income vs Expenses */}
          <div style={{ height: '300px', width: '100%' }}>
            <h4>Monthly Income vs Expenses ({vehicleName})</h4>
            <Line data={monthlyIncomeExpenseData} options={chartOptions} />
            <p style={{ marginTop: '10px', color: '#4bc0c0' }}>
              Net Income for {currentMonthName}:Ghc {monthlyNetIncome[currentMonthIndex].toFixed(2)} 
            </p>
          </div>

          {/* Expenses by Category */}
          <div style={{ height: '300px', width: '100%' }}>
            <h4>Expenses by Category ({vehicleName})</h4>
            <Bar data={categoryExpenseData} options={chartOptions} />
          </div>
        </div>
      </div>
    );
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    barPercentage: 0.5, // Add space between bars
    categoryPercentage: 0.5, // Add space between bars
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: financialData && Object.keys(financialData).length > 1 ? 'row' : 'column',
        overflowX: 'auto',
        minHeight: '100vh',
        flexWrap: 'wrap', // To wrap vehicles in a new row if space is tight
      }}
    >
      {financialData &&
        Object.keys(financialData).map((vehicleName) =>
          generateChartsForVehicle(financialData[vehicleName], vehicleName)
        )}
    </div>
  );
};

export default DashboardContent;
