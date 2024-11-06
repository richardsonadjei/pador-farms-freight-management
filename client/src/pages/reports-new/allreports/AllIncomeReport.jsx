import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import ReportsHomeSidebar from '../SideBar';

const AllIncomeReport = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all vehicles and set the first one as default
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/financial-records/grouped-by-vehicle');
        if (!response.ok) {
          console.error('Error fetching vehicles:', response.status);
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
        console.error('Error fetching vehicles:', error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Calculate total income by source
  const getIncomeSummaryBySource = () => {
    if (!selectedVehicle) return [];
    const incomeSummary = selectedVehicle[1].incomes.reduce((acc, income) => {
      acc[income.source] = (acc[income.source] || 0) + income.amount;
      return acc;
    }, {});
    return Object.entries(incomeSummary).map(([source, amount]) => ({ source, amount }));
  };

  // Group incomes by source for individual tables
  const getIncomesBySource = () => {
    if (!selectedVehicle) return {};
    return selectedVehicle[1].incomes.reduce((acc, income) => {
      acc[income.source] = acc[income.source] || [];
      acc[income.source].push(income);
      return acc;
    }, {});
  };

  const incomeSummary = getIncomeSummaryBySource();
  const incomesBySource = getIncomesBySource();

  return (
    <Container fluid style={{ padding: 0, width: '100vw', margin: 0, overflowX: 'hidden' }}>
      {/* Include the Sidebar as an off-canvas component */}
      <ReportsHomeSidebar />

      <Container fluid style={{ maxWidth: '100vw', overflowX: 'hidden', padding: '20px' }}>
        {selectedVehicle && (
          <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
            All Income Report for Vehicle: {selectedVehicle[1].vehicleInfo.registrationNumber}
          </h2>
        )}

        {/* Summary Table of Total Income by Source */}
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Source</th>
              <th>Total Income (Ghc)</th>
            </tr>
          </thead>
          <tbody>
            {incomeSummary.map((summary, index) => (
              <tr key={index}>
                <td>{summary.source}</td>
                <td>{summary.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>
        ) : (
          Object.keys(incomesBySource).map((source, index) => (
            <div key={index}>
              <h3 style={{ color: 'lightblue', marginTop: '20px', textAlign: 'center' }}>
                Income from {source}
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
                  {incomesBySource[source].map((income, idx) => (
                    <tr key={income._id}>
                      <td>{idx + 1}</td>
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
            </div>
          ))
        )}
      </Container>
    </Container>
  );
};

export default AllIncomeReport;
