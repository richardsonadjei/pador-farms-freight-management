import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AllVehiclesReport = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/all-Vehicles');
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

  const toggleModalUpdate = () => setModalUpdate(!modalUpdate);
  const toggleModalDelete = () => setModalDelete(!modalDelete);

  const handleUpdateClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    toggleModalUpdate();
  };

  const handleDeleteClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    toggleModalDelete();
  };

  const handleInputChange = (fieldName, value) => {
    setSelectedVehicle({
      ...selectedVehicle,
      [fieldName]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/update-vehicle/${selectedVehicle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedVehicle),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update vehicle');
      }
  
      // Assuming the server responds with the updated vehicle data
      const updatedVehicle = await response.json();
  
      // Update the local state with the updated vehicle
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => (vehicle.id === selectedVehicle.id ? updatedVehicle : vehicle))
      );
  
      // Close the modal
      toggleModalUpdate();
  
      // Alert user and navigate to /fleet-management
      alert('Vehicle updated successfully!');
      window.location.href = '/fleet-management';
    } catch (error) {
      console.error('Error updating vehicle:', error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };
  
  

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/delete-vehicle/${selectedVehicle._id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete vehicle');
      }
  
      // Assuming the server responds with a success message
      const deleteResult = await response.json();
  
      // Remove the deleted vehicle from the local state
      setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== selectedVehicle.id));
  
      // Close the modal
      toggleModalDelete();
    } catch (error) {
      console.error('Error deleting vehicle:', error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };
  
  return (
    <Container>
      <Row>
      <Col>
          <h1 style={{ color: 'white' }}>All Vehicles Report</h1>
          <div className="table-responsive">
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Date Registered</th>
                  <th>Registration Number</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Chassis Number</th>
                  <th>Capacity</th>
                  <th>Year Purchased</th>
                  <th>Price</th>
                  <th>Fuel Type</th>
                  <th>Actions</th>
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
                    <td>
                      <FaEdit
                        size={20}
                        color="blue"
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        onClick={() => handleUpdateClick(vehicle)}
                      />
                      <FaTrash
                        size={20}
                        color="red"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteClick(vehicle)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Update Modal */}
      <Modal isOpen={modalUpdate} toggle={toggleModalUpdate}>
        <ModalHeader toggle={toggleModalUpdate}>Update Vehicle</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="registrationNumber">Registration Number</Label>
              <Input
                type="text"
                name="registrationNumber"
                id="registrationNumber"
                value={selectedVehicle?.registrationNumber || ''}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="make">Make</Label>
              <Input
                type="text"
                name="make"
                id="make"
                value={selectedVehicle?.make || ''}
                onChange={(e) => handleInputChange('make', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="model">Model</Label>
              <Input
                type="text"
                name="model"
                id="model"
                value={selectedVehicle?.model || ''}
                onChange={(e) => handleInputChange('model', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
  <Label for="chasisNumber">Chasis Number</Label>
  <Input
    type="text"
    name="chasisNumber"
    id="chasisNumber"
    value={selectedVehicle?.chasisNumber || ''}
    onChange={(e) => handleInputChange('chasisNumber', e.target.value)}
  />
</FormGroup>

            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="text"
                name="price"
                id="price"
                value={selectedVehicle?.price || ''}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="yearPurchased">Year Purchased</Label>
              <Input
                type="text"
                name="yearPurchased"
                id="yearPurchased"
                value={selectedVehicle?.yearPurchased || ''}
                onChange={(e) => handleInputChange('yearPurchased', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <Input
                type="text"
                name="status"
                id="status"
                value={selectedVehicle?.status || ''}
                onChange={(e) => handleInputChange('status', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="mileage">Mileage</Label>
              <Input
                type="text"
                name="mileage"
                id="mileage"
                value={selectedVehicle?.mileage || ''}
                onChange={(e) => handleInputChange('mileage', e.target.value)}
              />
            </FormGroup>
            {/* Add more form fields based on your data */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>{' '}
          <Button color="secondary" onClick={toggleModalUpdate}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllVehiclesReport;
