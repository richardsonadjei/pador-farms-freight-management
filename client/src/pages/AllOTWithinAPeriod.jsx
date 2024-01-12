import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AllOtherTripsWithinPeriodReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [otherTrips, setOtherTrips] = useState([]);
  const [reportData, setReportData] = useState(null);

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedVehicleRegistrationNumber, setUpdatedVehicleRegistrationNumber] = useState('');
  const [updatedDriverName, setUpdatedDriverName] = useState('');
  const [updatedTotalAmountCharged, setUpdatedTotalAmountCharged] = useState('');
  const [updatedDestinationLocations, setUpdatedDestinationLocations] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedRecordedBy, setUpdatedRecordedBy] = useState('');

  useEffect(() => {
    fetchOtherTrips();
  }, []);

  const fetchOtherTrips = async () => {
    try {
      const response = await fetch('/api/viewByDateRange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtherTrips(data.otherTrips);
        setReportData(data);
      } else {
        console.error('Error fetching other trips:', data.message);
      }
    } catch (error) {
      console.error('Error fetching other trips:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOtherTrips();
  };

  const calculateTotalAmountCharged = (trips) => {
    return trips.reduce((total, trip) => total + trip.totalAmountCharged, 0);
  };

  const handleEdit = (trip) => {
    setSelectedTrip(trip);
    setUpdatedDate(new Date(trip.date).toISOString().split('T')[0]);
    setUpdatedVehicleRegistrationNumber(trip.vehicleRegistrationNumber);
    setUpdatedDriverName(trip.driverName);
    setUpdatedTotalAmountCharged(trip.totalAmountCharged);
    setUpdatedDestinationLocations(trip.destinationLocations);
    setUpdatedDescription(trip.description);
    setUpdatedRecordedBy(trip.recordedBy);
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/update-trip/${selectedTrip.tripNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: updatedDate,
          vehicleRegistrationNumber: updatedVehicleRegistrationNumber,
          driverName: updatedDriverName,
          totalAmountCharged: updatedTotalAmountCharged,
          destinationLocations: updatedDestinationLocations,
          description: updatedDescription,
          recordedBy: updatedRecordedBy,
        }),
      });

      if (response.ok) {
        await fetchOtherTrips();
        setEditModalOpen(false);
      } else {
        console.error('Failed to update trip:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  const handleDelete = (trip) => {
    setSelectedTrip(trip);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/delete-trip/${selectedTrip.tripNumber}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchOtherTrips();
        setDeleteModalOpen(false);
      } else {
        console.error('Failed to delete trip:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="startDate" className="text-white">Start Date</Label>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="endDate" className="text-white">End Date</Label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <Button color="primary" type="submit">Generate Report</Button>
          </Col>
        </Row>
      </Form>

      {reportData && (
  <div className="mt-4">
    <h3 className="text-white">Other Trips Report</h3>
    <Table className="table table-bordered table-striped table-responsive">
      <thead>
        <tr>
          <th>Trip Number</th>
          <th>Date</th>
          <th>Vehicle Registration Number</th>
          <th>Driver Name</th>
          <th>Total Amount Charged</th>
          <th>Destination Locations</th>
          <th>Description</th>
          <th>Recorded By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {otherTrips.map((trip) => (
          <tr key={trip._id}>
            <td>{trip.tripNumber}</td>
            <td>{new Date(trip.date).toLocaleDateString()}</td>
            <td>{trip.vehicleRegistrationNumber}</td>
            <td>{trip.driverName}</td>
            <td>{trip.totalAmountCharged}</td>
            <td>{trip.destinationLocations}</td>
            <td>{trip.description}</td>
            <td>{trip.recordedBy}</td>
            <td>
              <FaEdit className="text-primary mr-2" onClick={() => handleEdit(trip)} />
              <FaTrashAlt className="text-danger" onClick={() => handleDelete(trip)} />
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="4" className="text-right">Total Amount Charged:</td>
          <td>{calculateTotalAmountCharged(otherTrips)}</td>
          <td colSpan="4"></td>
        </tr>
      </tbody>
    </Table>
  </div>
)}


      <Modal isOpen={editModalOpen} toggle={() => setEditModalOpen(!editModalOpen)}>
        <ModalHeader toggle={() => setEditModalOpen(!editModalOpen)}>Edit Trip</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="updatedDate">Date</Label>
              <Input
                type="date"
                id="updatedDate"
                value={updatedDate}
                onChange={(e) => setUpdatedDate(e.target.value)}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="updatedVehicleRegistrationNumber">Vehicle Registration Number</Label>
              <Input
                type="text"
                id="updatedVehicleRegistrationNumber"
                value={updatedVehicleRegistrationNumber}
                onChange={(e) => setUpdatedVehicleRegistrationNumber(e.target.value)}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="updatedDriverName">Driver Name</Label>
              <Input
                type="text"
                id="updatedDriverName"
                value={updatedDriverName}
                onChange={(e) => setUpdatedDriverName(e.target.value)}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="updatedTotalAmountCharged">Total Amount Charged</Label>
              <Input
                type="text"
                id="updatedTotalAmountCharged"
                value={updatedTotalAmountCharged}
                onChange={(e) => setUpdatedTotalAmountCharged(e.target.value)}
                
              />
            </FormGroup>
            <FormGroup>
              <Label for="updatedDestinationLocations">Destination Locations</Label>
              <Input
                type="text"
                id="updatedDestinationLocations"
                value={updatedDestinationLocations}
                onChange={(e) => setUpdatedDestinationLocations(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="updatedDescription">Description</Label>
              <Input
                type="text"
                id="updatedDescription"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="updatedRecordedBy">Recorded By</Label>
              <Input
                type="text"
                id="updatedRecordedBy"
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
          {/* <Button color="danger" onClick={() => setDeleteModalOpen(true)}>
            Delete
          </Button> */}
          <Button color="secondary" onClick={() => setEditModalOpen(!editModalOpen)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModalOpen} toggle={() => setDeleteModalOpen(!deleteModalOpen)}>
        <ModalHeader toggle={() => setDeleteModalOpen(!deleteModalOpen)}>Delete Trip</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this trip?</p>
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

export default AllOtherTripsWithinPeriodReport;
