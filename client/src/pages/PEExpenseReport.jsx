import React, {  useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const PEExpenseReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [modal, setModal] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch data from the server based on the date range
    fetch(`/api/all-pe-expense?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        setReportData(data);
      })
      .catch((error) => console.error(error));
  };


  const handleStatusClick = (expense) => {
    setSelectedExpense(expense);
  };
  
  useEffect(() => {
    // Update the updatedStatus when the selectedExpense changes
    if (selectedExpense) {
      setUpdatedStatus(selectedExpense.status);
      setModal(true); // Open the modal after updating the state
    }
  }, [selectedExpense]);
  
  
  const toggleModal = () => setModal(!modal);

  const handleUpdateStatus = async () => {
    console.log('Selected Expense:', selectedExpense);
  console.log('Updated Status:', updatedStatus);
    try {
      const response = await fetch(`/api/pe-expenditure/${selectedExpense._id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: updatedStatus,
        }),
      });
  
      if (response.ok) {
        toggleModal();
        // Refresh data after update
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/pe-expenditure/${selectedExpense._id}`);
            if (response.ok) {
              const data = await response.json();
              // Update the selectedExpense with the latest data
              setSelectedExpense(data);
              setReportData(data); // Update reportData if needed
              // Alert the user about the successful update
              alert('Status updated successfully!');
              // Navigate back to "//primary-evacuations"
            window.location.href = "/primary-evacuations";
            } else {
              console.error('Failed to fetch PE expense data');
            }
          } catch (error) {
            console.error(`Error: ${error.message}`);
          }
        };
  
        fetchData();
      } else {
        console.error('Failed to update status');
        // Alert the user about the failure to update status
        alert('Failed to update status. Please try again.');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      // Alert the user about the error
      alert('An error occurred. Please try again.');
    }
  };
  

  const calculateTotalAmount = (expenditures, field) => {
    return expenditures.reduce((total, item) => total + (Number(item[field]) || 0), 0);
  };

  return (
    <Container>
      <h2 className="text-white mt-4">PE Expenditure Report</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label className="text-white">Start Date</Label>
              <Input type="date" name="startDate" onChange={handleStartDateChange} required />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label className="text-white">End Date</Label>
              <Input type="date" name="endDate" onChange={handleEndDateChange} required />
            </FormGroup>
          </Col>
          <Col md={4}>
            <Button type="submit" color="primary">
              Generate Report
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Render the PE Expenditure report table only if data is available */}
      {reportData && (
        <>
          <h3 className="text-white mt-4">PE Expenditure Details</h3>
          <Table responsive className="table-shadow mt-2">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>PE Number</th>
                <th>Registration Number</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Recorded By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through reportData.peExpenditures and render each row */}
              {reportData.peExpenditures.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.category}</td>
                  <td>{item.peNumber}</td>
                  <td>{item.vehicleRegistrationNumber}</td>
                  <td>{item.expenditureAmount}</td>
                  <td>{item.description}</td>
                  <td>{item.recordedBy}</td>
                  <td onClick={() => handleStatusClick(item)}>
                    <span style={{ cursor: 'pointer', textDecoration: 'none', color: 'blue' }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Summary Table for PE Expenditure */}
          <h3 className="text-white mt-4">PE Expenditure Summary</h3>
          <Table responsive className="table-shadow mt-2">
            <thead>
              <tr>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{calculateTotalAmount(reportData.peExpenditures, 'expenditureAmount')}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
     {/* Update Status Modal */}
<Modal isOpen={modal} toggle={toggleModal}>
  <ModalHeader toggle={toggleModal}>Update Status</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="status">Status</Label>
        <Input
          type="select"
          name="status"
          id="status"
          value={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.value)}
        >
          <option value="paid">paid</option>
          <option value="pending payment">pending payment</option>
        </Input>
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={handleUpdateStatus}>
      Update
    </Button>{' '}
    <Button color="secondary" onClick={toggleModal}>
      Cancel
    </Button>
  </ModalFooter>
</Modal>

    </Container>
  );
};

export default PEExpenseReport;
