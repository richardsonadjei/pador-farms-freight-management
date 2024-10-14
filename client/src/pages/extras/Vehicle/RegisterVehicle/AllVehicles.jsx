import React, { useState, useEffect } from 'react';
import { Table, Dropdown, Button, Container, Collapse, Spinner } from 'react-bootstrap';
import { FaEllipsisV, FaEdit, FaTrash, FaSync, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import AddInsuranceModal from '../../../finance/Expense/InsuranceModal';
import AddRoadworthyModal from '../../../finance/Expense/RoadWorthyModal';

const VehicleList = ({ handleEdit, handleDelete }) => {
  const [vehicles, setVehicles] = useState([]);
  const [openDetails, setOpenDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showRoadworthyModal, setShowRoadworthyModal] = useState(false); // State to control roadworthy modal
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [insuranceDetails, setInsuranceDetails] = useState({}); // Store insurance details for each vehicle
  const [roadworthyDetails, setRoadworthyDetails] = useState({}); // Store roadworthy details for each vehicle

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/vehicle'); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data);

        // Set all rows as open by default
        const initialOpenDetails = {};
        data.forEach((vehicle, index) => {
          initialOpenDetails[index] = true;
          fetchInsuranceDetails(vehicle._id); // Fetch insurance details for each vehicle
          fetchRoadworthyDetails(vehicle._id); // Fetch roadworthy details for each vehicle
        });
        setOpenDetails(initialOpenDetails);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Helper function to format dates as Mon 18 Aug-24
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: '2-digit',
    });
  };

  // Fetch insurance details for a specific vehicle
  const fetchInsuranceDetails = async (vehicleId) => {
    try {
      const response = await fetch(`/api/insurance/vehicle/${vehicleId}`); // Replace with your backend endpoint
      if (response.ok) {
        const insuranceData = await response.json();
        setInsuranceDetails((prevDetails) => ({
          ...prevDetails,
          [vehicleId]: insuranceData, // Store insurance data for each vehicle by ID
        }));
      }
    } catch (error) {
      console.error(`Error fetching insurance data for vehicle ${vehicleId}:`, error);
    }
  };

  // Fetch roadworthy details for a specific vehicle
  const fetchRoadworthyDetails = async (vehicleId) => {
    try {
      const response = await fetch(`/api/roadworthy/vehicle/${vehicleId}`); // Replace with your backend endpoint
      if (response.ok) {
        const roadworthyData = await response.json();
        setRoadworthyDetails((prevDetails) => ({
          ...prevDetails,
          [vehicleId]: roadworthyData, // Store roadworthy data for each vehicle by ID
        }));
      }
    } catch (error) {
      console.error(`Error fetching roadworthy data for vehicle ${vehicleId}:`, error);
    }
  };

  const toggleDetails = (index) => {
    setOpenDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Function to handle opening the insurance modal
  const handleRenewInsurance = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowInsuranceModal(true);
  };

  // Function to handle closing the insurance modal
  const handleCloseInsuranceModal = () => {
    setShowInsuranceModal(false);
    setSelectedVehicle(null);
  };

  // Function to handle opening the roadworthy modal
  const handleRenewRoadworthy = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowRoadworthyModal(true); // Show the roadworthy modal
  };

  // Function to handle closing the roadworthy modal
  const handleCloseRoadworthyModal = () => {
    setShowRoadworthyModal(false);
    setSelectedVehicle(null);
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
      <h2 className="text-center mb-4" style={{ color: 'white' }}>Vehicle List</h2>

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
              <th>Status</th>
              <th>Legal Renewals</th> {/* Updated from 'Insurance Details' */}
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
                        <Dropdown.Item onClick={() => handleRenewRoadworthy(vehicle)}>
                          <FaSync className="me-2" /> Roadworthy Renewal
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
                          <h5>Insurance</h5>
                          <Table bordered hover className="mb-3">
                            <thead className="table-light">
                              <tr>
                                <th>Insurance Company</th>
                                <th>Premium Amount</th>
                                <th>Policy Number</th>
                                <th>Coverage</th>
                                <th>Expiration Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {insuranceDetails[vehicle._id] ? (
                                <tr>
                                  <td>{insuranceDetails[vehicle._id].insuranceCompany || 'N/A'}</td>
                                  <td>{insuranceDetails[vehicle._id].premiumAmount || 'N/A'}</td>
                                  <td>{insuranceDetails[vehicle._id].policyNumber || 'N/A'}</td>
                                  <td>{insuranceDetails[vehicle._id].coverageDetails || 'N/A'}</td>
                                  <td>{insuranceDetails[vehicle._id].endDate ? formatDate(insuranceDetails[vehicle._id].endDate) : 'N/A'}</td>
                                </tr>
                              ) : (
                                <tr>
                                  <td colSpan="5" className="text-center">
                                    No Active Insurance Details Available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>

                          <h5>RoadWorthy</h5>
                          <Table bordered hover className="mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Roadworthy Center</th>
                                <th>Amount</th>
                                <th>Certificate Number</th>
                                <th>Expiration Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {roadworthyDetails[vehicle._id] ? (
                                <tr>
                                  <td>{roadworthyDetails[vehicle._id].roadworthyCenter || 'N/A'}</td>
                                  <td>{roadworthyDetails[vehicle._id].renewalAmount || 'N/A'}</td>
                                  <td>{roadworthyDetails[vehicle._id].certificateNumber || 'N/A'}</td>
                                  <td>{roadworthyDetails[vehicle._id].expiryDate ? formatDate(roadworthyDetails[vehicle._id].expiryDate) : 'N/A'}</td>
                                </tr>
                              ) : (
                                <tr>
                                  <td colSpan="4" className="text-center">
                                    No Active Roadworthy Details Available
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

      {/* Insurance Modal */}
      {selectedVehicle && (
        <AddInsuranceModal
          show={showInsuranceModal}
          handleClose={handleCloseInsuranceModal}
          vehicle={selectedVehicle}
          handleSave={(newInsurance) => {
            console.log('New Insurance Saved: ', newInsurance);
            fetchInsuranceDetails(selectedVehicle._id); // Refresh insurance details
          }}
        />
      )}

      {/* Roadworthy Modal */}
      {selectedVehicle && (
        <AddRoadworthyModal
          show={showRoadworthyModal}
          handleClose={handleCloseRoadworthyModal}
          vehicle={selectedVehicle}
          handleSave={(newRoadworthy) => {
            console.log('New Roadworthy Saved: ', newRoadworthy);
            fetchRoadworthyDetails(selectedVehicle._id); // Refresh roadworthy details
          }}
        />
      )}
    </Container>
  );
};

export default VehicleList;
