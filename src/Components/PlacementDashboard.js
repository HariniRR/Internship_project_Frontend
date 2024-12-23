import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Department.css';

const Dashboard = () => {
  return (
    <Container fluid className="placement-dashboard">
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Training Programme Details</Card.Title>
              <Card.Text>
                Details about Placement training Activity for Student.
              </Card.Text>
              <Link to="/training" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Placement Drive Details</Card.Title>
              <Card.Text>
              Details about placement Drive  Activity for Student.
              </Card.Text>
              <Link to="/facultyactivity" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Placed Students Details</Card.Title>
              <Card.Text>
                List of Placed Students Details.
              </Card.Text>
              <Link to="/instituteclub" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Students Placed more than 4 Lakhs per annum Details:</Card.Title>
              <Card.Text>
                Information about Students Placed more than 4 Lakhs per annum.
              </Card.Text>
              <Link to="/career" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
