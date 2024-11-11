import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const getCurrentMonthRange = () => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return `${formatDate(firstDayOfMonth)} - ${formatDate(lastDayOfMonth)}`;
};

const isDateInCurrentMonth = (date) => {
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

const BalanceSummary = () => {
  const [motorbikeData, setMotorbikeData] = useState({});
  const [latestCommissionRate, setLatestCommissionRate] = useState(0); // State to hold latest commission rate
  const currentUser = useSelector((state) => state.user.currentUser?.userName || '');

  const fetchData = async () => {
    try {
      const response = await fetch('/api/financial-records/grouped-by-vehicle');
      const { data } = await response.json();

      if (!data) {
        console.error('Invalid data structure', data);
        return;
      }

      setMotorbikeData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLatestCommissionRate = async () => {
    try {
      const response = await fetch('/api/pe-commissions');
      const { data } = await response.json();
  
      if (data && data.length > 0) {
       
  
        // Sort records by date in descending order and take the first record as the latest
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const latestCommission = sortedData[0];
  
        setLatestCommissionRate(latestCommission.amount); // Set latest commission rate amount
 
      } else {
        console.error('No commission data available');
      }
    } catch (error) {
      console.error('Error fetching commission data:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
    fetchLatestCommissionRate();

    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const calculateTotal = (transactions, filterFunction) => {
    return (transactions || [])
      .filter((transaction) => filterFunction(new Date(transaction.dateOfExpense || transaction.date)))
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  return (
    <div className="balance-summary">
      <Row className="justify-content-center">
        {Object.keys(motorbikeData)
          .filter((motorbike) => !(currentUser === 'Pinkrah' && motorbike === 'M-24-GR 4194'))
          .map((motorbike, index) => {
            const data = motorbikeData[motorbike];
            if (!data) return null;

            const {
              vehicleInfo,
              primaryEvacuationExpenses = [],
              otherTripExpenses = [],
              generalExpenses = [],
              incomes = [],
            } = data;

            // Calculations for Primary Evacuations
            const primaryEvacuationIncomes = incomes.filter(
              (income) => income.source === 'Primary Evacuation' && isDateInCurrentMonth(new Date(income.date))
            );
            const numberOfPrimaryEvacuations = primaryEvacuationIncomes.length; // Number of primary evacuations
            const totalBagsHauled = primaryEvacuationIncomes.reduce(
              (sum, income) => sum + parseFloat(income.notes.match(/([\d.]+)\s+bags/)?.[1] || 0),
              0
            );

            // Calculate driver's commission based on the latest rate and total bags hauled
            const driverCommissionPrimaryEvacuation = totalBagsHauled * latestCommissionRate;
            console.log(`Total bags hauled: ${totalBagsHauled}, Commission rate: ${latestCommissionRate}`);
            console.log('Calculated driverCommissionPrimaryEvacuation:', driverCommissionPrimaryEvacuation);

            const totalPrimaryEvacuationIncome = primaryEvacuationIncomes.reduce(
              (acc, income) => acc + (income.amount || 0),
              0
            );
            const totalPrimaryEvacuationExpense = calculateTotal(primaryEvacuationExpenses, isDateInCurrentMonth);

            // Calculations for Other Trips
            const otherTripsIncomes = incomes.filter(
              (income) => income.source === 'Other Trips' && isDateInCurrentMonth(new Date(income.date))
            );
            const numberOfOtherTrips = otherTripsIncomes.length; // Number of other trips
            const totalOtherTripsIncome = otherTripsIncomes.reduce((acc, income) => acc + (income.amount || 0), 0);
            const totalOtherTripsExpense = calculateTotal(otherTripExpenses, isDateInCurrentMonth);
            const driverCommissionOtherTrips = totalOtherTripsIncome * 0.2;

            // Calculations for General Expenses
            const totalGeneralExpenses = calculateTotal(generalExpenses, isDateInCurrentMonth);

            // Total Income, Expenses, and Balance
            const totalIncome = totalPrimaryEvacuationIncome + totalOtherTripsIncome;
            const totalExpenses = totalPrimaryEvacuationExpense + totalOtherTripsExpense + totalGeneralExpenses;
            const balance = totalIncome - totalExpenses;

            return (
              <Col xs={12} md={8} className="mb-4" key={index}>
                <div className="summary-card motorbike-summary">
                  <div className="summary-header" style={{ textAlign: 'center', padding: '2px 0' }}>
                    <h5>Truck: {vehicleInfo?.registrationNumber || 'Unknown'}</h5>
                    <span>{getCurrentMonthRange()}</span>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                      <p style={{ fontWeight: 'bold', color: 'blue' }}>
                        Total Income: {totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'Ghc' })}
                      </p>
                      <p style={{ fontWeight: 'bold', color: '#e74c3c' }}>
                        Total Expense: {totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'Ghc' })}
                      </p>
                      <p style={{ fontWeight: 'bold', color: balance >= 0 ? 'green' : 'red' }}>
                        Balance: {balance.toLocaleString('en-US', { style: 'currency', currency: 'Ghc' })}
                      </p>
                    </div>
                  </div>

                  {/* Primary Evacuation Summary Table */}
                  <div className="table-responsive">
                    <h6 style={{ textAlign: 'center', margin: '5px 0 5px' }}>Primary Evacuations</h6>
                    <Table striped bordered hover variant="light" className="mb-4">
                      <thead>
                        <tr>
                          <th>Number of PEs</th>
                          <th>Total Bags Hauled</th>
                          <th>Total Income</th>
                          <th>Total Expenses</th>
                          <th>Driver's Commission</th>
                          <th>Net Income</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ textAlign: 'center' }}>{numberOfPrimaryEvacuations}</td>
                          <td style={{ textAlign: 'center' }}>{totalBagsHauled.toFixed(2)}</td>
                          <td style={{ textAlign: 'center' }}>{totalPrimaryEvacuationIncome.toLocaleString()}</td>
                          <td style={{ textAlign: 'center', color: '#e74c3c' }}>
                            {totalPrimaryEvacuationExpense.toLocaleString()}
                          </td>
                          <td style={{ textAlign: 'center', color: '#e74c3c' }}>
                            {driverCommissionPrimaryEvacuation.toLocaleString()}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {(totalPrimaryEvacuationIncome - totalPrimaryEvacuationExpense - driverCommissionPrimaryEvacuation).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  {/* Other Trips Summary Table */}
                  <div className="table-responsive">
                    <h6 style={{ textAlign: 'center', margin: '5px 0 5px' }}>Other Trips</h6>
                    <Table striped bordered hover variant="light">
                      <thead>
                        <tr>
                          <th>Number of Trips</th>
                          <th>Total Income</th>
                          <th>Total Expenses</th>
                          <th>Driver's Commission</th>
                          <th>Net Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ textAlign: 'center' }}>{numberOfOtherTrips}</td>
                          <td style={{ textAlign: 'center' }}>{totalOtherTripsIncome.toLocaleString()}</td>
                          <td style={{ textAlign: 'center', color: '#e74c3c' }}>
                            {totalOtherTripsExpense.toLocaleString()}
                          </td>
                          <td style={{ textAlign: 'center', color: '#e74c3c' }}>
                            {driverCommissionOtherTrips.toLocaleString()}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {(totalOtherTripsIncome - totalOtherTripsExpense - driverCommissionOtherTrips).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default BalanceSummary;
