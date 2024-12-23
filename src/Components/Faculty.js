import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Department.css';

const Dashboard = () => {
  return (
    <Container fluid className="faculty-dashboard">
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Faculty Partipication</Card.Title>
              <Card.Text>
                Details about various  Co-curricular Activities within the department.
              </Card.Text>
              <Link to="/participation" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title> Guest Lecture  by the Faculty Member</Card.Title>
              <Card.Text>
              Details about various lecture within the department
              </Card.Text>
              <Link to="/lecture" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Faculty Online Course Details</Card.Title>
              <Card.Text>
                List of online course  offered by the department.
              </Card.Text>
              <Link to="/course" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Faculty Awards/Achievements Details</Card.Title>
              <Card.Text>
                Information about different Awards/Achievements and their events.
              </Card.Text>
              <Link to="/faculty-awards" className="btn btn-primary">
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
