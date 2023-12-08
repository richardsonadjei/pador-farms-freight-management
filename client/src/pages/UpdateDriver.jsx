import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams } from 'react-router';

const UpdateDriver = () => {
  const [driver, setDriver] = useState({
    firstName: '',
    lastName: '',
    licenseNumber: '',
    dateOfBirth: '',
    contactNumber: '',
    email: '',
    town: '',
    city: '',
    region: '',
    ghanaCardId: '',
    witnessName: '',
    witnessContact: '',
    registeredBy: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { id } = useParams(); // Updated line for React Router v6

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await fetch(`/api/drivers/${id}`);
        const data = await response.json();

        if (response.ok) {
          // Create a new object with the properties you want to update in the state
          const updatedDriver = {
            firstName: data.driver.firstName,
            lastName: data.driver.lastName,
            licenseNumber: data.driver.licenseNumber,
            dateOfBirth: data.driver.dateOfBirth,
            contactNumber: data.driver.contactNumber,
            email: data.driver.email,
            town: data.driver.town,
            city: data.driver.city,
            region: data.driver.region,
            ghanaCardId: data.driver.ghanaCardId,
            witnessName: data.driver.witnessName,
            witnessContact: data.driver.witnessContact,
            registeredBy: data.driver.registeredBy,
          };

          setDriver(updatedDriver);
        } else {
          setError(data.error || 'Failed to fetch driver details.');
        }
      } catch (error) {
        console.error('Error fetching driver details:', error);
        setError('Internal Server Error. Please try again later.');
      }
    };

    fetchDriverDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver((prevDriver) => ({
      ...prevDriver,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/drivers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driver),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || 'Failed to update driver details.');
      }
    } catch (error) {
      console.error('Error updating driver details:', error);
      setError('Internal Server Error. Please try again later.');
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2>Update Driver</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={driver.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={driver.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="licenseNumber" className="form-label">
              License Number
            </label>
            <input
              type="text"
              className="form-control"
              id="licenseNumber"
              name="licenseNumber"
              value={driver.licenseNumber}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="text"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={driver.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              className="form-control"
              id="contactNumber"
              name="contactNumber"
              value={driver.contactNumber}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={driver.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="town" className="form-label">
              Town
            </label>
            <input
              type="text"
              className="form-control"
              id="town"
              name="town"
              value={driver.town}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={driver.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="region" className="form-label">
              Region
            </label>
            <input
              type="text"
              className="form-control"
              id="region"
              name="region"
              value={driver.region}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="ghanaCardId" className="form-label">
              Ghana Card ID
            </label>
            <input
              type="text"
              className="form-control"
              id="ghanaCardId"
              name="ghanaCardId"
              value={driver.ghanaCardId}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="witnessName" className="form-label">
              Witness Name
            </label>
            <input
              type="text"
              className="form-control"
              id="witnessName"
              name="witnessName"
              value={driver.witnessName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="witnessContact" className="form-label">
              Witness Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="witnessContact"
              name="witnessContact"
              value={driver.witnessContact}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="registeredBy" className="form-label">
              Registered By
            </label>
            <input
              type="text"
              className="form-control"
              id="registeredBy"
              name="registeredBy"
              value={driver.registeredBy}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Driver
        </button>
      </form>
    </div>
  );
};

export default UpdateDriver;
