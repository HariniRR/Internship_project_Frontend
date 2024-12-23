import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Department.css';

const Dashboard = () => {
  return (
    <Container fluid className="dashboard-container">
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Association Activities</Card.Title>
              <Card.Text>
                Details about various associations within the department.
              </Card.Text>
              <Link to="/AssociationDetails" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Club Activities</Card.Title>
              <Card.Text>
                Information about different clubs and their events.
              </Card.Text>
              <Link to="/clubname" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Value-Added Courses</Card.Title>
              <Card.Text>
                List of value-added courses offered by the department.
              </Card.Text>
              <Link to="/valueaddedcourse" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col> */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>MoU/Centre of Excellence Activity</Card.Title>
              <Card.Text>
                Information about different clubs and their events.
              </Card.Text>
              <Link to="/mou" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Consultancy Activities</Card.Title>
              <Card.Text>
                 Various Consultancy Activities
              </Card.Text>
              <Link to="/consultancy" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Program Organized for Faculty Members</Card.Title>
              <Card.Text>
               Various Program Organized for Faculty Members
              </Card.Text>
              <Link to="/program" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Infrastructure Details</Card.Title>
              <Card.Text>
                List of Infrastructure Details offered by the department.
              </Card.Text>
              <Link to="/infrastructure" className="btn btn-primary">
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
