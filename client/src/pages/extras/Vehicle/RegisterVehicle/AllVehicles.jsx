import React, { useState, useEffect } from 'react';
import { Table, Dropdown, Button, Container, Collapse, Spinner } from 'react-bootstrap';
import { FaEllipsisV, FaEdit, FaTrash, FaSync, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const VehicleList = ({ handleEdit, handleDelete, handleRenewInsurance }) => {
  const [vehicles, setVehicles] = useState([]);
  const [openDetails, setOpenDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the vehicle data from the backend API
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/vehicle'); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const toggleDetails = (index) => {
    setOpenDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) {
    return (
      <Container fluid className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Loading Vehicles...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-4">
      <h2 className="text-center mb-4">Vehicle List</h2>
      <div className="table-responsive">
        <Table bordered hover className="vehicle-list-table">
          <thead className="table-dark">
            <tr>
              <th>Registration Number</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>Chassis Number</th>
              <th>Engine Number</th>
              <th>Status</th>
              <th>Insurance Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{vehicle.registrationNumber}</td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.color}</td>
                  <td>{vehicle.chassisNumber}</td>
                  <td>{vehicle.engineNumber}</td>
                  <td>{vehicle.status}</td>
                  <td className="text-center">
                    <Button
                      variant="link"
                      onClick={() => toggleDetails(index)}
                      aria-expanded={openDetails[index]}
                      className="text-dark"
                    >
                      {openDetails[index] ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </td>
                  <td className="text-center">
                    <Dropdown>
                      <Dropdown.Toggle variant="link" id={`dropdown-${index}`} className="text-dark">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleEdit(vehicle)}>
                          <FaEdit className="me-2" /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDelete(vehicle)}>
                          <FaTrash className="me-2" /> Delete
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRenewInsurance(vehicle)}>
                          <FaSync className="me-2" /> Renew Insurance
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" className="p-0">
                    <Collapse in={openDetails[index]}>
                      <div>
                        <div className="table-responsive p-3">
                          <h5>Insurance Details</h5>
                          <Table bordered hover className="mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Insurance Company</th>
                                <th>Policy Number</th>
                                <th>Expiration Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {vehicle.insuranceDetails && vehicle.insuranceDetails.length > 0 ? (
                                vehicle.insuranceDetails.map((insurance, i) => (
                                  <tr key={i}>
                                    <td>{insurance.company || 'N/A'}</td>
                                    <td>{insurance.policyNumber || 'N/A'}</td>
                                    <td>{insurance.expirationDate ? new Date(insurance.expirationDate).toLocaleDateString() : 'N/A'}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3" className="text-center">
                                    No Insurance Details Available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default VehicleList;
