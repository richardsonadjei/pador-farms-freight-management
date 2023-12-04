import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Col, Row } from 'reactstrap';

const DriversCommission = () => {
  return (
    <div className="container mt-5">
      <Row>
        {/* Pay PE Commission Card */}
        <Col md={4} className="mb-4">
          <Card>
            <div className="card-body">
              <h3 className="card-title">Pay PE Commission</h3>
              <p className="card-text">Click below to pay PE commission to drivers.</p>
              <Link to="/pe-drivers-commission">
                <Button color="primary">Pay PE Commission</Button>
              </Link>
            </div>
          </Card>
        </Col>

        {/* Pay OT Commission Card */}
        <Col md={4} className="mb-4">
          <Card>
            <div className="card-body">
              <h3 className="card-title">Pay OT Commission</h3>
              <p className="card-text">Click below to pay OT commission to drivers.</p>
              <Link to="/ot-drivers-commission">
                <Button color="primary">Pay OT Commission</Button>
              </Link>
            </div>
          </Card>
        </Col>

        {/* View Pending Drivers Commission Card */}
        <Col md={4} className="mb-4">
          <Card>
            <div className="card-body">
              <h3 className="card-title">View Pending Drivers Commission</h3>
              <p className="card-text">View a list of pending drivers commission.</p>
              <Link to="/pending-payment-drivers-commission">
                <Button color="primary">View Pending Drivers Commission</Button>
              </Link>
            </div>
          </Card>
        </Col>

        {/* View Paid Drivers Commission Card */}
        <Col md={4} className="mb-4">
          <Card>
            <div className="card-body">
              <h3 className="card-title">View Paid Drivers Commission</h3>
              <p className="card-text">View a list of paid drivers commission.</p>
              <Link to="/paid-drivers-commission">
                <Button color="primary">View Paid Drivers Commission</Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DriversCommission;
