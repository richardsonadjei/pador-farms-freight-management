import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AllExpenseCategories = () => {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [updateData, setUpdateData] = useState({
    name: '',
    description: '',
    recordedBy: '',
  });

  const toggleModal = () => setModal(!modal);

  const fetchExpenseCategories = async () => {
    try {
      const response = await fetch('/api/expenditure-categories');
      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = await response.json();
      setExpenseCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenseCategories();
  }, []);

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setUpdateData({
      name: category.name,
      description: category.description,
      recordedBy: category.recordedBy,
    });
    toggleModal();
  };

  const handleDeleteClick = async (category) => {
    try {
      const response = await fetch(`/expenditure-categories/${category._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Server Error');
      }
      fetchExpenseCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
        const response = await fetch(`/api/update-expenditure-categories/${selectedCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        throw new Error('Server Error');
      }
      toggleModal();
      fetchExpenseCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <h1 className="text-white">Expense Categories Report</h1>
      <Table responsive striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Recorded By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenseCategories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.recordedBy}</td>
              <td>
                <Button color="link" onClick={() => handleUpdateClick(category)}>
                  <FaEdit size={20} />
                </Button>{' '}
                <Button color="link" onClick={() => handleDeleteClick(category)}>
                  <FaTrash size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Update Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Update Expense Category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" value={updateData.name} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" id="description" value={updateData.description} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="recordedBy">Recorded By</Label>
              <Input type="text" name="recordedBy" id="recordedBy" value={updateData.recordedBy} onChange={handleChange} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
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

export default AllExpenseCategories;
