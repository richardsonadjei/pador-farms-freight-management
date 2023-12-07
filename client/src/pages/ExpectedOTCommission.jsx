import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

const ExpectedOTCommissionReport = () => {
  const [selectedOtherTrip, setSelectedOtherTrip] = useState('');
  const [otherTrips, setOtherTrips] = useState([]);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchOtherTrips = async () => {
      try {
        const response = await fetch('/api/other-trips');
        const data = await response.json();
  
        // Ensure otherTrips is an array and set it in the state
        setOtherTrips(Array.isArray(data.otherTrips) ? data.otherTrips : []);
      } catch (error) {
        console.error('Error fetching other trips:', error);
      }
    };
  
    fetchOtherTrips();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/expected-ot-driver-commissions?tripNumber=${selectedOtherTrip}`);
      const data = await response.json();

      setReportData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="otherTripNumber" className="text-white">Select Other Trip Number</Label>
              <Input
                type="select"
                name="otherTripNumber"
                id="otherTripNumber"
                value={selectedOtherTrip}
                onChange={(e) => setSelectedOtherTrip(e.target.value)}
              >
                <option value="" disabled>Select Other Trip</option>
                {Array.isArray(otherTrips) && otherTrips.map((trip) => (
                  <option key={trip.tripNumber} value={trip.tripNumber}>
                    {trip.tripNumber}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <Button color="primary" type="submit">Generate Report</Button>
          </Col>
        </Row>
      </Form>

      {reportData && (
        <div className="mt-4">
          <h3 className="text-white">Expected OT Commission Report</h3>

          <Table className="table table-bordered table-striped table-responsive">
            <thead>
              <tr>
                <th>Trip Number</th>
                <th>Income</th>
                <th>Overall Expenditure</th>
                <th>Expected Commission</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{reportData.tripNumber}</td>
                <td>{reportData.income}</td>
                <td>{reportData.overallExpenditure}</td>
                <td>
                  <Link to={`/ot-drivers-commission?expectedCommission=${Math.round(reportData.expectedCommission)}`}>
                    {Math.round(reportData.expectedCommission)}
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default ExpectedOTCommissionReport;
