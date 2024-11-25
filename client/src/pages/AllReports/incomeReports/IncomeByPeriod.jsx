import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import ReportsHomeSidebar from '../SideBar';

const IncomeByPeriod = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  // Fetch incomes only when the generate button is clicked
  const fetchIncomes = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    try {
      setLoading(true);

      const [vehicleId] = selectedVehicle;
      const response = await fetch(
        `/api/financial-records/vehicle-within-period?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        console.error('Error fetching incomes:', response.status);
        setLoading(false);
        return;
      }

      const { data } = await response.json();
      const vehicleData = data[vehicleId];
      if (vehicleData && vehicleData.incomes) {
        setIncomes(vehicleData.incomes);
      } else {
        setIncomes([]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      setLoading(false);
    }
  };

  // Calculate total income
  const calculateTotalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  return (
    <Container fluid style={{ padding: 0, width: '100vw', margin: 0, overflowX: 'hidden' }}>
      {/* Include the Sidebar as an off-canvas component */}
      <ReportsHomeSidebar />

      <Container fluid style={{ padding: '20px', margin: '0 auto' }}>
        <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          Income Report by Period for Vehicle: {selectedVehicle ? selectedVehicle[1].vehicleInfo.registrationNumber : 'N/A'}
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
          <Button variant="primary" onClick={fetchIncomes} style={{ marginTop: '10px' }}>
            Get Income
          </Button>
        </Form>

        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>
        ) : incomes.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center' }}>No income records found for the selected period.</p>
        ) : (
          <>
            {/* Summary Section */}
            <div style={{ marginBottom: '20px', textAlign: 'center', color: 'white' }}>
              <h4>Total Income: Ghc {calculateTotalIncome().toLocaleString()}</h4>
            </div>

            {/* Income Table */}
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
                {incomes.map((income, index) => (
                  <tr key={income._id}>
                    <td>{index + 1}</td>
                    <td>
                      {new Date(income.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: '2-digit',
                      })}
                    </td>
                    <td>{income.amount.toLocaleString()}</td>
                    
                    <td>{income.notes || 'N/A'}</td>
                    <td>{income.recordedBy || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </Container>
  );
};

export default IncomeByPeriod;
