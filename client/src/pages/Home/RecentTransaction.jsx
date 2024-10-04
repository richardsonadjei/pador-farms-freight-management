import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser?.userName || '');

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/all-records');
      const { data } = await response.json();

      if (!data) {
        console.error('Invalid data structure', data);
        return;
      }

      // Map data from different models
      const primaryEvacuationTransactions = data.primaryEvacuations.map((item) => ({
        ...item,
        description: item.notes || `Primary Evacuation - ${item.vehicle?.registrationNumber || ''}`,
        transactionType: 'Primary Evacuation',
        color: 'text-info',
        date: item.dateOfEvacuation,
      }));

      const otherTripTransactions = data.otherTrips.map((item) => ({
        ...item,
        description: item.notes || `Other Trip - ${item.purpose} (${item.vehicle?.registrationNumber || ''})`,
        transactionType: 'Other Trip',
        color: 'text-warning',
        date: item.dateOfTrip,
      }));

      const primaryEvacuationExpenseTransactions = data.primaryEvacuationExpenses.map((item) => ({
        ...item,
        description: `Primary Evacuation Expense - ${(item.category?.name || item.category) || 'Unknown Category'} (${item.vehicle?.registrationNumber || ''})`,
        transactionType: 'Expense',
        color: 'text-danger',
        date: item.dateOfExpense,
      }));

      const otherTripExpenseTransactions = data.otherTripExpenses.map((item) => ({
        ...item,
        description: `Other Trip Expense - ${(item.category?.name || item.category) || 'Unknown Category'} (${item.vehicle?.registrationNumber || ''})`,
        transactionType: 'Expense',
        color: 'text-danger',
        date: item.dateOfExpense,
      }));

      const generalExpenseTransactions = data.generalExpenses.map((item) => ({
        ...item,
        description: `General Expense - ${(item.category?.name || item.category) || 'Unknown Category'}`,
        transactionType: 'Expense',
        color: 'text-danger',
        date: item.dateOfExpense,
      }));

      const incomeTransactions = data.incomes.map((item) => ({
        ...item,
        description: item.notes || `Income - ${item.source}`,
        transactionType: 'Income',
        color: 'text-success',
        date: item.date || item.dateOfIncome, // Handle both date formats
      }));

      // Combine all transactions into one array and sort by date
      let allTransactions = [
        ...primaryEvacuationTransactions,
        ...otherTripTransactions,
        ...primaryEvacuationExpenseTransactions,
        ...otherTripExpenseTransactions,
        ...generalExpenseTransactions,
        ...incomeTransactions,
      ].filter((transaction) => transaction.date) // Ensure date is valid
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      // Set the transactions state
      setTransactions(allTransactions); // Remove `.slice(0, 5)` to show all transactions or use `.slice(0, n)` to limit
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchTransactions();

    // Fetch transactions every 10 seconds (10000ms)
    const intervalId = setInterval(() => {
      fetchTransactions();
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentUser]);

  // Function to format the date as Mon Aug 8 -24
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    return `${formattedDate} -${year}`;
  };

  return (
    <div className="recent-transactions">
      <h5 style={{ color: 'white' }}>Recent Transactions</h5>
      <ListGroup style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <ListGroup.Item key={index} className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">{formatDate(transaction.date)}</small>
                <span className={`badge ${transaction.color}`}>{transaction.transactionType}</span>
              </div>
              <div className="mt-1">
                <span>{transaction.description}</span>
                <span className={`float-end ${transaction.color}`}>
                  {transaction.amount ? `${transaction.currency || 'Ghc'} ${transaction.amount.toFixed(2)}` : 'Trip'}
                </span>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No recent transactions found.</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default RecentTransactions;
