import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const AllVehiclesReport = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch vehicles data when the component mounts
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/all-Vehicles'); // Replace with your actual API endpoint
      if (response.ok) {
        const data = await response.json();
        setVehicles(data.vehicles);
      } else {
        console.error('Error fetching vehicles:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error.message);
    }
  };

  const convertToLocalDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ color: 'white' }}>All Vehicles Report</h1>
          <table className="table">
            <thead>
              <tr>
              <th>Date Registered</th>
                <th>Registration Number</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Chasis Number</th>
                <th>Capacity</th>
                <th>Year Purchased</th>
                <th>Price</th>
                <th>Fuel Type</th>
               
                {/* Add more columns based on your data */}
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{convertToLocalDate(vehicle.createdAt)}</td>
                  <td>{vehicle.registrationNumber}</td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.chasisNumber}</td>
                  <td>{vehicle.capacity}</td>
                  <td>{vehicle.yearPurchased}</td>
                  <td>{vehicle.price}</td>
                  <td>{vehicle.fuelType}</td>
                  
                  {/* Add more cells based on your data */}
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllVehiclesReport;
