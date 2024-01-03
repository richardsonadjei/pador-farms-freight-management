import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ViewAllPEReport = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  const [peData, setPEData] = useState([]);
  const [selectedPE, setSelectedPE] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updatedPeNumber, setUpdatedPeNumber] = useState('');

  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedTruckRegistration, setUpdatedTruckRegistration] = useState('');
  const [updatedDriverName, setUpdatedDriverName] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');
  const [updatedTotalWeight, setUpdatedTotalWeight] = useState('');
  const [updatedDestinations, setUpdatedDestinations] = useState('');
  const [updatedRecordedBy, setUpdatedRecordedBy] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Add this useEffect hook
  useEffect(() => {
    if (selectedPE) {
      setUpdatedPeNumber(selectedPE.peNumber);
      setUpdatedDate(new Date(selectedPE.date).toISOString().split('T')[0]);
      setUpdatedTruckRegistration(selectedPE.truckRegistrationNumber);
      setUpdatedDriverName(selectedPE.driverName);
      setUpdatedQuantity(selectedPE.quantity);
      setUpdatedTotalWeight(selectedPE.totalweightCarried);
      setUpdatedDestinations(selectedPE.destinationLocations);
      setUpdatedRecordedBy(selectedPE.recordedBy);
    }
  }, [selectedPE]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch PE data based on the date range
      const response = await fetch(`/api/all-pe?startDate=${formData.startDate}&endDate=${formData.endDate}`);
      const data = await response.json();

      setPEData(data);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching PE data');
    }
  };

  const handleEdit = (pe) => {
    setSelectedPE(pe);
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/update-pe/${selectedPE.peNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          peNumber: updatedPeNumber,
          date: updatedDate,
          truckRegistrationNumber: updatedTruckRegistration,
          driverName: updatedDriverName,
          quantity: updatedQuantity,
          totalweightCarried: updatedTotalWeight,
          destinationLocations: updatedDestinations,
          recordedBy: updatedRecordedBy,
        }),
      });

      if (response.ok) {
        // Refresh PE data after update
        const updatedData = await fetch(`/api/all-pe?startDate=${formData.startDate}&endDate=${formData.endDate}`);
        const updatedPEData = await updatedData.json();
        setPEData(updatedPEData);

        setEditModalOpen(false);
        setSuccessMessage('PE record updated successfully');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to update PE record');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error updating PE record:', error);
      setErrorMessage('Error updating PE record');
      setSuccessMessage('');
    }
  };

  const handleDelete = (pe) => {
    setSelectedPE(pe);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/delete-pe/${selectedPE.peNumber}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh PE data after deletion
        const updatedData = await fetch(`/api/all-pe?startDate=${formData.startDate}&endDate=${formData.endDate}`);
        const updatedPEData = await updatedData.json();
        setPEData(updatedPEData);

        setDeleteModalOpen(false);
        setSuccessMessage('PE record deleted successfully');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to delete PE record');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error deleting PE record:', error);
      setErrorMessage('Error deleting PE record');
      setSuccessMessage('');
    }
  };

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>PE Number</th>
          <th>Date</th>
          <th>Truck Registration</th>
          <th>Driver Name</th>
          <th>Quantity</th>
          <th>Total Weight Carried(Kg)</th>
          <th>Destination Locations</th>
          <th>Recorded By</th>
          <th>Actions</th>
        </tr>
      </thead>
    );
  };
  
  const renderTableRows = () => {
    return (
      <tbody>
        {peData.map((pe) => (
          <tr key={pe._id}>
            <td>{pe.peNumber}</td>
            <td>{new Date(pe.date).toLocaleDateString()}</td>
            <td>{pe.truckRegistrationNumber}</td>
            <td>{pe.driverName}</td>
            <td>{pe.quantity}</td>
            <td>{pe.totalweightCarried}</td>
            <td>{pe.destinationLocations}</td>
            <td>{pe.recordedBy}</td>
            <td>
              <FaEdit className="text-primary mr-2" onClick={() => handleEdit(pe)} />
              <FaTrashAlt className="text-danger" onClick={() => handleDelete(pe)} />
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const redirectToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <Container>
      <h2 className="text-white">View All PE Report</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Start Date</Label>
              <Input type="date" name="startDate" onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">End Date</Label>
              <Input type="date" name="endDate" onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Form>

      {peData.length > 0 && (
        <div>
          <h3 className="mt-4 text-white">Detailed Report</h3>
          <Table bordered striped responsive className="mt-2">
            {renderTableHeader()}
            {renderTableRows()}
          </Table>
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={editModalOpen} toggle={() => setEditModalOpen(!editModalOpen)}>
        <ModalHeader toggle={() => setEditModalOpen(!editModalOpen)}>Edit PE Record</ModalHeader>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="peNumber">PE Number</Label>
              <Input type="text" id="peNumber" value={selectedPE?.peNumber || ''} disabled />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={updatedDate}
                onChange={(e) => setUpdatedDate(e.target.value)}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="truckRegistration">Truck Registration</Label>
              <Input
                type="text"
                id="truckRegistration"
                value={updatedTruckRegistration}
                onChange={(e) => setUpdatedTruckRegistration(e.target.value)}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="driverName">Driver Name</Label>
              <Input
                type="text"
                id="driverName"
                value={updatedDriverName}
                onChange={(e) => setUpdatedDriverName(e.target.value)}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Quantity</Label>
              <Input
                type="text"
                id="quantity"
                value={updatedQuantity}
                onChange={(e) => setUpdatedQuantity(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="totalWeight">Total Weight Carried(Kg)</Label>
              <Input
                type="text"
                id="totalWeight"
                value={updatedTotalWeight}
                onChange={(e) => setUpdatedTotalWeight(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="destinations">Destination Locations</Label>
              <Input
                type="text"
                id="destinations"
                value={updatedDestinations}
                onChange={(e) => setUpdatedDestinations(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="recordedBy">Recorded By</Label>
              <Input
                type="text"
                id="recordedBy"
                value={updatedRecordedBy}
                onChange={(e) => setUpdatedRecordedBy(e.target.value)}
                disabled
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button color="secondary" onClick={() => setEditModalOpen(!editModalOpen)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} toggle={() => setDeleteModalOpen(!deleteModalOpen)}>
        <ModalHeader toggle={() => setDeleteModalOpen(!deleteModalOpen)}>Delete PE Record</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this PE record?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
          <Button color="secondary" onClick={() => setDeleteModalOpen(!deleteModalOpen)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

     
    </Container>
  );
};

export default ViewAllPEReport;
