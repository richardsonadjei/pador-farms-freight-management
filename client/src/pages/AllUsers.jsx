import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'reactstrap';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch users from the server
      const response = await fetch('/api/auth/all-users'); // Replace '/api/users' with your actual API endpoint
      const data = await response.json();

      if (data.success) {
        // Update the state with the fetched users
        setUsers(data.users);
      } else {
        // Handle error cases
        console.error('Error fetching users:', data.error);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ color: 'white' }}>All Users</h1>
          {users.map((user) => (
            <div key={user._id} style={{ marginBottom: '20px' }}>
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th colSpan="2">User Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{user.name}</td>
                  </tr>
                 
                  <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                  </tr>
                  
                  {/* Add more user details as needed */}
                </tbody>
              </Table>

              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th colSpan="2">Additional Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Telephone Number</td>
                    <td>{user.telephoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Ghana Card Number</td>
                    <td>{user.ghanaCardNumber}</td>
                  </tr>
                  <tr>
                    <td>Bank</td>
                    <td>{user.bank}</td>
                  </tr>
                  <tr>
                    <td>Bank Account Number</td>
                    <td>{user.bankAccountNumber}</td>
                  </tr>
                  <tr>
                    <td>Bank Branch</td>
                    <td>{user.bankBranch}</td>
                  </tr>
                  <tr>
                    <td>Next of Kin Name</td>
                    <td>{user.nextOfKinName}</td>
                  </tr>
                  <tr>
                    <td>Next of Kin Contact</td>
                    <td>{user.nextOfKinContact}</td>
                  </tr>
                  <tr>
                    <td>Next of Kin Ghana Card Number</td>
                    <td>{user.nextOfKinGhanaCardNumber}</td>
                  </tr>
                  <tr>
                    <td>Witness Name</td>
                    <td>{user.witnessName}</td>
                  </tr>
                  <tr>
                    <td>Witness Contact</td>
                    <td>{user.witnessContact}</td>
                  </tr>
                  {/* Add more additional details as needed */}
                </tbody>
              </Table>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default AllUsers;
