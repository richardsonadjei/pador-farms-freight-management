import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// Utility function to get the date range for the current month
const getCurrentMonthRange = () => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return `${formatDate(firstDayOfMonth)} - ${formatDate(lastDayOfMonth)}`;
};

// Utility function to check if a date is in the current month
const isDateInCurrentMonth = (date) => {
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

// Extract number of bags from notes field
const extractNumberOfBagsFromNotes = (notes) => {
  const match = notes.match(/(\d+)\s+bags/);
  return match ? parseInt(match[1], 10) : 0;
};

const BalanceSummary = () => {
  const [motorbikeData, setMotorbikeData] = useState({});
  const currentUser = useSelector((state) => state.user.currentUser?.userName || '');

  // Fetch transactions from the API
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

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000); // Update every 100 seconds

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
          .filter((motorbike) => !(currentUser === 'Pinkrah' && motorbike === 'M-24-GR 4194')) // Filter out the motorbike for Pinkrah
          .map((motorbike, index) => {
            const data = motorbikeData[motorbike];
            if (!data) return null;

            const {
              vehicleInfo,
              primaryEvacuationExpenses = [],
              otherTripExpenses = [],
              incomes = [],
            } = data;

            // Calculations for Primary Evacuations
            const primaryEvacuationIncomes = incomes.filter(
              (income) => income.source === 'Primary Evacuation' && isDateInCurrentMonth(new Date(income.date))
            );
            const totalBagsHauled = primaryEvacuationIncomes.reduce(
              (sum, income) => sum + extractNumberOfBagsFromNotes(income.notes),
              0
            );
            const totalPrimaryEvacuationIncome = primaryEvacuationIncomes.reduce(
              (acc, income) => acc + (income.amount || 0),
              0
            );
            const totalPrimaryEvacuationExpense = calculateTotal(primaryEvacuationExpenses, isDateInCurrentMonth);
            const driverCommissionPrimaryEvacuation = totalPrimaryEvacuationIncome * 0.2;
            const netIncomePrimaryEvacuation =
              totalPrimaryEvacuationIncome - totalPrimaryEvacuationExpense - driverCommissionPrimaryEvacuation;

            // Calculations for Other Trips
            const otherTripsIncomes = incomes.filter(
              (income) => income.source === 'Other Trips' && isDateInCurrentMonth(new Date(income.date))
            );
            const totalOtherTripsIncome = otherTripsIncomes.reduce((acc, income) => acc + (income.amount || 0), 0);
            const totalOtherTripsExpense = calculateTotal(otherTripExpenses, isDateInCurrentMonth);
            const driverCommissionOtherTrips = totalOtherTripsIncome * 0.2;
            const netRevenueOtherTrips = totalOtherTripsIncome - totalOtherTripsExpense - driverCommissionOtherTrips;

            return (
              <Col xs={12} md={6} className="mb-4" key={index}>
                <div className="summary-card motorbike-summary">
                  {/* Motorbike Summary */}
                  <div className="summary-header">
                    <h5>Truck:{vehicleInfo?.registrationNumber || 'Unknown'}</h5>
                    <span>{getCurrentMonthRange()}</span>
                  </div>

                  {/* Primary Evacuation Summary */}
                  <div className="summary-table mt-3">
                    <h6>Primary Evacuations</h6>
                    <div>
                      <strong>Total Bags Hauled</strong>
                      <div>{totalBagsHauled}</div>
                    </div>
                    <div>
                      <strong>Total Income</strong>
                      <div>{totalPrimaryEvacuationIncome.toLocaleString()}</div>
                    </div>
                    <div>
                      <strong>Total Expenses</strong>
                      <div className="text-danger">{totalPrimaryEvacuationExpense.toLocaleString()}</div>
                    </div>
                    <div>
                      <strong>Driver's Commission</strong>
                      <div className="text-danger">{driverCommissionPrimaryEvacuation.toLocaleString()}</div>
                    </div>
                    <div>
                      <strong>Net Income</strong>
                      <div>{netIncomePrimaryEvacuation.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Other Trips Summary */}
                  <div className="summary-table mt-4">
                    <h6>Other Trips</h6>
                    <div>
                      <strong>Total Income</strong>
                      <div>{totalOtherTripsIncome.toLocaleString()}</div>
                    </div>
                    <div>
                      <strong>Total Expenses</strong>
                      <div className="text-danger">{totalOtherTripsExpense.toLocaleString()}</div>
                    </div>
                    <div>
                      <strong>Driver's Commission</strong>
                      <div className="text-danger">{driverCommissionOtherTrips.toLocaleString()}</div>
                    </div>
                    <div>
                      <strong>Net Revenue</strong>
                      <div>{netRevenueOtherTrips.toLocaleString()}</div>
                    </div>
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
