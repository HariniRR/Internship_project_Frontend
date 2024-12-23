import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Department.css';

const Dashboard = () => {
  return (
    <Container fluid className="professional-dashboard">
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Professional Societies Activities for Student</Card.Title>
              <Card.Text>
                Details about Professional Society Activity for Student.
              </Card.Text>
              <Link to="/studentactivity" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Professional Societies Activities for Faculty</Card.Title>
              <Card.Text>
              Details about Professional Society Activity for Faculty.
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
              <Card.Title>Institute Club Activities</Card.Title>
              <Card.Text>
                List of Institute Club Activities.
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
              <Card.Title>Entrepreneurship Development/Career Guidance & Higher Education Cell Activities</Card.Title>
              <Card.Text>
                Information about Entrepreneurship Development/Career Guidance & Higher Education Cell Activities
              </Card.Text>
              <Link to="/career" className="btn btn-primary">
                Click Here
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title> Institute MoU Details</Card.Title>
              <Card.Text>
                List of Mou offered by the Institute.
              </Card.Text>
              <Link to="/institutemou" className="btn btn-primary">
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
