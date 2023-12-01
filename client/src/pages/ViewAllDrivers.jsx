import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Table } from 'reactstrap';

const AllDrivers = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Fetch all drivers when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/api/all-drivers'); 
        const data = await response.json();
        setDrivers(data.drivers);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{ color: 'white' }}>All Registered Drivers</h2>
          <Table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>License Number</th>
                <th>Date of Birth</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Town</th>
                <th>City</th>
                <th>Region</th>
                <th>Ghana Card ID</th>
                <th>Witness Name</th>
                <th>Witness Contact</th>
                <th>Registered By</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver._id}>
                  <td>{driver.firstName}</td>
                  <td>{driver.lastName}</td>
                  <td>{driver.licenseNumber}</td>
                  <td>{new Date(driver.dateOfBirth).toLocaleDateString()}</td>
                  <td>{driver.contactNumber}</td>
                  <td>{driver.email}</td>
                  <td>{driver.town}</td>
                  <td>{driver.city}</td>
                  <td>{driver.region}</td>
                  <td>{driver.ghanaCardId}</td>
                  <td>{driver.witnessName}</td>
                  <td>{driver.witnessContact}</td>
                  <td>{driver.registeredBy}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllDrivers;
